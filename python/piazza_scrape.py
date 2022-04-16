from piazza_api import Piazza
import pandas as pd

def get_student_emails(course):
    """
    Return dictionary of student Piazza IDs mapped to emails.
    """
    students = {}
    user_info = course.get_all_users()
    for user in user_info:
        if user['role'] == 'student':
            students[user['id']] = user['email']
    return students

def get_post_data(course):
    """
    Get data for all posts, excluding instructor and automatic Piazza activity.
    """
    post_df_vars = ['postNo','id','activity','date','uid','endorsements','views']
    post_df = pd.DataFrame(columns=post_df_vars)

    posts = course.iter_all_posts()
    obs_count = 0
    # Get post number, id, activity type, date, user id, views data
    for post in posts:
        log = post['change_log']
        if log[0]['v'] == 'private': # Private post, not counted
            continue
        post_no = post['nr']
        views = post['unique_views']
        for act in log:
            if 'data' in act.keys():
                actId = act['data']
            else:
                actId = act['cid']
            # Don't count anonymous posters or updates to posts
            if act['anon'] != 'no' or 'update' in act['type']:
                continue
            new_obs = [post_no, actId, act['type'], act['when'], act['uid'], None, views]
            post_df.loc[obs_count] = new_obs
            obs_count += 1

        # Add endorsement data
        queue = [post]
        while len(queue) > 0:
            curr = queue.pop(0)
            if 'answer' not in curr['type']:
                endorsement_ids = curr['tag_good_arr']
            else:
                endorsement_ids = curr['tag_endorse_arr']

            # Remove endorsement from the activity author
            poster = post_df.loc[(post_df['date'] == curr['created']) &
                                 (post_df['postNo'] == post_no), 'uid'].values
            if len(poster) > 0:
                if poster[0] in endorsement_ids:
                    endorsement_ids.remove(poster[0])
                # Add endorsements
                post_df.loc[(post_df['date'] == curr['created']) &
                            (post_df['postNo'] == post_no), 'endorsements'] = len(endorsement_ids)

            for child in curr['children']:
                queue.append(child)

    # Remove non-student activity
    student_info = get_student_emails(course)
    post_df['uid'] = post_df['uid'].map(student_info)
    post_df.drop(post_df[pd.isna(post_df['uid'])].index, inplace=True)

    return post_df

def get_student_data(post_df, p1, p2, p3, p4):
    """ 
    Returns list with each list element as a summary for one student:
        [student Piazza id, questions, answers/followups, views, endorsements, points]
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
        pts = p1*q + p2*a + p3*views + p4*likes
        student_data.append({'Email': stud, 'Questions': q, 'Answers': a, 'Views': views, 'Endorsements': likes, 'Points': pts})
    return student_data

def pull_post_data(username, password, network_id):
    """
    Return dataframe of all public, non-anonymous student post activity.
    """
    # Login to Piazza
    p = Piazza()
    p.user_login(username, password)

    # Get Piazza course
    course = p.network(network_id)

    # Get post activity dataframe
    post_df = get_post_data(course)
    return post_df

def pull_data(username, password, network_id, p1, p2, p3, p4):
    """
    Return student statistics for all Piazza activity.
    """
    post_df = pull_post_data(username, password, network_id)
    student_data = get_student_data(post_df, p1, p2, p3, p4)
    return student_data
