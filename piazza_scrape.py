from piazza_api import Piazza
import pandas as pd
from datetime import date
import pymongo

def get_student_emails(course):
    """
    Return dictionary of student Piazza ids to emails
    """
    students = {}
    user_info = course.get_all_users()
    for user in user_info:
        if user['role'] == 'student':
            students[user['id']] = user['email']
    return students

def get_post_data(course):
    """
    Get data from all posts, excluding instructor activity.
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

    student_info = get_student_emails(course)
    post_df['uid'] = post_df['uid'].map(student_info)
    post_df.drop(post_df[pd.isna(post_df['uid'])].index, inplace=True)
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

def pull_data(db_link):
    """
    Return student statistic based on all public, non-anonymous post activity.
    """
    # Get instructor login from MongoDB
    myClient = pymongo.MongoClient(db_link)
    mydb = myClient['myFirstDatabase']
    myTable = mydb['instructordatas']
    
    tableSearch = myTable.find_one()
    if not tableSearch:
        exit('No instructor data table in MongoDB')
        
    username, password = tableSearch['InstructorID'], tableSearch['InstructorPassword']
    network_id = tableSearch['NetworkID']
    
    if username == None or len(username) == 0 or password == None or len(password) == 0:
        exit('Incomplete instructor login credentials')
    if network_id == None or len(network_id) == 0:
        exit('Invalid Piazza course ID')
    
    # Login to Piazza
    p = Piazza()
    try:
        p.user_login(username, password)
    except:
        exit('Invalid login credentials')
    
    # Get Piazza course
    try:
        course = p.network(network_id)
        test_post = course.get_post(1)
    except:
        exit("Bad Piazza course ID")
        
    post_df = get_post_data(course)
    student_data = get_student_data(post_df)
    return student_data
