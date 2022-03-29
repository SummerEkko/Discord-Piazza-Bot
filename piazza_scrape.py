from piazza_api import Piazza
import pandas as pd

# Login, prompts for username and password
p = Piazza()
p.user_login()

# Get course
network_id = "l0k527orea42id" # Fake CSC 510
course = p.network(network_id)

# Initialize dataframe
post_df_vars = ['postNo','id','activity','date','uid','endorsements','views']
post_df = pd.DataFrame(columns=post_df_vars)

# Add sample data
posts = course.iter_all_posts()
obs_count = 0
for post in posts:
    post_no = post['nr']
    views = post['unique_views']
    history = post['history']
    log = post['change_log']
    for act in log:
        if 'data' in act.keys():
            actId = act['data']
        else:
            actId = act['cid']
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

instructorId = ['l0k52ugr1jf4xv','gd6v7134AUa']
post_df.drop(post_df[post_df['uid'].isin(instructorId)].index, inplace=True)

# Data for students
student_data = []
students = post_df['uid'].unique()
for stud in students:
    stud_df = post_df[post_df['uid'] == stud]
    likes = sum(stud_df['endorsements'])
    quest = stud_df[stud_df['activity'].str.contains('create')]
    ans = stud_df.drop(quest.index)
    q = quest.shape[0]
    a = ans.shape[0]
    views = sum(quest.drop_duplicates('postNo')['views']) + sum(ans.drop_duplicates('postNo')['views'])
    # student piazza id, questions, answers/followups, views, endorsements
    student_data.append([stud, q, a, views, likes])

# Final data stored in student_data, each element is one student
