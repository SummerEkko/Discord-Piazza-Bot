from apscheduler.schedulers.blocking import BlockingScheduler
import pymongo
import python.piazza_scrape as ps

db_url = "" # Add mongodb from config
myClient = pymongo.MongoClient(db_url)

mydb = myClient["myFirstDatabase"]
totalData = mydb["totalData"]
dailyData = mydb["dailyData"]
instructorTable = mydb["instructordatas"]
username = instructorTable.find_one()['InstructorID']
password = instructorTable.find_one()['InstructorPassword']
networkID = instructorTable.find_one()['NetworkID']
p1 = instructorTable.find_one()['P1']
p2 = instructorTable.find_one()['P2']
p3 = instructorTable.find_one()['P3']
p4 = instructorTable.find_one()['P4']

def update(initialize = False):
    """
    Overwrite daily and total data database with latest data.
    If initialize is true, only overwrite total data.
    """
    allData = ps.pull_data(username, password, networkID)
    if not initialize:
        lastDay = allData
        for student in lastDay:
            obs = totalData.find_one({'Email': student['Email']})
            for key in student.keys():
                if key != 'Email':
                    student[key] -= obs[key]
        dailyData.delete_many({})
        dailyData.insert_many(lastDay)

    totalData.delete_many({})
    totalData.insert_many(allData)

sched = BlockingScheduler()

def scheduleJobs():
    sched.add_job(update, 'cron', args=[True], year = '2022', month = '04', day = '01', hour='00', minute='00', second='00')
    sched.add_job(update, 'cron', hour='00', minute='00', second='00')

    # regular update
    # sched.add_job(update, 'cron', hour='00', minute='00', second='00')
    # sched.start()

if __name__ == '__main__':
    scheduleJobs()
