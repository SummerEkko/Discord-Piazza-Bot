import sys
from piazza_api import Piazza

def main():
    args = sys.argv
    if len(args) != 4:
        print("Invalid args")

    p = Piazza()
    email = args[1]
    passwd = args[2]
    net_id = args[3]
    try:
        p.user_login(email=email, password=passwd)
        print("Login success")
    except:
        exit("Login failed")

    try:
        course = p.network(net_id)
        test_post = course.get_post(1)
    except:
        exit("Bad network id")

    posts = course.iter_all_posts()

main()