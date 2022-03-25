from piazza_api import Piazza
import pandas as pd

# Login, prompts for username and password
p = Piazza()
p.user_login()

# Get course
network_id = "ky09haj6kvc533" # Actual CSC 510
course = p.network(network_id)

# Initialize dataframe
df_vars = ['postNo','activity','studentId','date','views']
post_df = pd.DataFrame(columns=df_vars)

# Add sample data from one post
post442 = course.get_post(442)
post_no = post442['nr']
views = post442['unique_views']
activity_log = post442['change_log']
count = 0
for act in activity_log:
    post_df.loc[count] = [post_no, act['type'], act['uid'], act['when'], views]
    count += 1