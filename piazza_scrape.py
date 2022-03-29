from piazza_api import Piazza
import pandas as pd
from datetime import date

def p_login():
    """Login to piazza, prompts for email and password."""
    p = Piazza()
    p.user_login()
    return p

def get_course(p, network_id):
    """
    Return course object for given network id.
    
    p: Piazza object
    network_id: str
    """
    return p.network(network_id)

def get_user_emails(course):
    students = {}
    instructors = {}
    user_info = course.get_all_users()
    for user in user_info:
        if user['role'] == 'student':
            students[user['id']] = user['email']
        else:
            instructors[user['id']] = user['email']
    return students, instructors

def get_post_data(course, instructor_id):
    """
    Get data from all posts, excluding instructor activity.
    
    instructor_id: List[str]
    """
    post_df_vars = ['postNo','id','activity','date','uid','endorsements','views']
    post_df = pd.DataFrame(columns=post_df_vars)

    posts = course.iter_all_posts()
    obs_count = 0
    for post in posts:
        log = post['change_log']
        if log[0]['v'] == 'private':
            continue
        post_no = post['nr']
        views = post['unique_views']
        history = post['history']
        for act in log:
            if 'data' in act.keys():
                actId = act['data']
            else:
                actId = act['cid']
            if act['anon'] != 'no':
                continue
            new_obs = [post_no, actId, act['type'], act['when'], act['uid'], None, views]
            post_df.loc[obs_count] = new_obs
            obs_count += 1

        queue = [post]
        while len(queue) > 0:
            curr = queue.pop(0)
            if 'answer' not in curr['type']:
                endorsements = len(curr['tag_good_arr'])
            else:
                endorsements = len(curr['tag_endorse_arr'])

            post_df.loc[(post_df['date'] == curr['created']) & (post_df['postNo'] == post_no), 'endorsements'] = endorsements
            
            for child in curr['children']:
                queue.append(child)

    
    post_df.drop(post_df[post_df['uid'].isin(instructor_id)].index, inplace=True)
    return post_df

def get_student_data(post_df):
    """ 
    Returns list with each list element as a summary for one student:
        [student Piazza id, questions, answers/followups, views, endorsements]
    
    post_df: pandas.DataFrame
    student_data: List[List[str, int, int, int, int], ....]
    """
    student_data = []
    students = post_df['uid'].unique()
    for stud in students:
        stud_df = post_df[post_df['uid'] == stud]
        views = sum(stud_df.drop_duplicates('postNo')['views'])
        likes = sum(stud_df['endorsements'])
        quest = stud_df[stud_df['activity'].str.contains('create')]
        ans = stud_df.drop(quest.index)
        q = quest.shape[0]
        a = ans.shape[0]
        # student piazza id, questions, answers/followups, views, endorsements
        student_data.append([stud, q, a, views, likes])
    return student_data

def pull_data(network_id):
    """
    Initialize student data. Returns student statistics based on all student post activity.
    
    network_id: str
    """
    p = p_login()
    course = get_course(p, network_id)
    instructor_id = ['l0k52ugr1jf4xv','gd6v7134AUa']
    post_df = get_post_data(course, instructor_id)
    student_data = get_student_data(post_df)
    return student_data

def data_on_day(network_id, search_date = None):
    """
    Return student statistics for posts on date given. Format date as YYYY-MM-DD.
    
    search_date: str
    network_id: str
    """
    if not search_date:
        search_date = date.today().strftime('%Y-%m-%d')
    p = p_login()
    course = get_course(p, network_id)
    instructor_id = ['l0k52ugr1jf4xv','gd6v7134AUa']
    post_df = get_post_data(course, instructor_id)
    one_day = post_df[post_df['date'].str.contains(search_date)]
    
    student_data = get_student_data(one_day)
    return student_data

def latest_post_data(network_id):
    """
    Return student statistics for latest post.
    
    network_id: str
    """
    p = p_login()
    course = get_course(p, network_id)
    instructor_id = ['l0k52ugr1jf4xv','gd6v7134AUa']
    post_df = get_post_data(course, instructor_id)
    last_post = post_df[post_df['postNo'] == max(post_df['postNo'])]
    student_data = get_student_data(last_post)
    return student_data
