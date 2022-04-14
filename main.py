from apscheduler.schedulers.background import BackgroundScheduler
import pymongo
import python.piazza_scrape as ps
import copy, json, time

def connect_db():
    with open('config.json') as f:
        config = json.load(f)

    myClient = pymongo.MongoClient(config['mongodb'])

    mydb = myClient["CSC-510-DB"]
    totalData = mydb["totalData"]
    dailyData = mydb["dailyData"]
    instructorTable = mydb["instructordatas"]
    try:
        username = instructorTable.find_one()['InstructorID']
        password = instructorTable.find_one()['InstructorPassword']
        networkID = instructorTable.find_one()['NetworkID']
        p1 = instructorTable.find_one()['P1']
        p2 = instructorTable.find_one()['P2']
        p3 = instructorTable.find_one()['P3']
        p4 = instructorTable.find_one()['P4']
    except:
        myClient.close()
        exit('Instructor needs to login')

    if p1 < 0 or p1 > 10 or p2 < 0 or p2 > 10 or p3 < 0 or p3 > 10 or p4 < 0 or p4 > 10:
        myClient.close()
        exit('Invalid parameter value')
    
    update(totalData, dailyData, username, password, networkID, p1, p2, p3, p4)
    myClient.close()


def update(totalData, dailyData, username, password, networkID, p1, p2, p3, p4):
    """
    Overwrite daily and total data database with latest data.
    If initialize is true, only overwrite total data.
    """
    allData = ps.pull_data(username, password, networkID, p1, p2, p3, p4)

    lastDay = copy.deepcopy(allData)
    for student in lastDay:
        obs = totalData.find_one({'Email': student['Email']})
        if obs:
            for key in student.keys():
                if key != 'Email':
                    student[key] -= obs[key]

    dailyData.delete_many({})
    dailyData.insert_many(lastDay)

    totalData.delete_many({})
    totalData.insert_many(allData)


def scheduleJobs():
    """
    Schedule daily Piazza data pull.
    """
    sched.add_job(connect_db, 'interval', seconds=60)
    sched.start()
    while True:
        time.sleep(1)


if __name__ == '__main__':
    sched = BackgroundScheduler()
    # Regular Piazza pull
    scheduleJobs()
