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

def initTotal():
    totalData.delete_many({})
    allData = ps.pull_data(username, password, networkID)
    totalData.insert_many(allData)

def updateDaily():
    allData = ps.pull_one_day_data(username, password, networkID)
    dailyData.insert_many(allData)

def updateTotal():
    lastDay = ps.pull_one_day_data(username, password, networkID)
    if len(lastDay) > 0:
        for student in lastDay:
            changed = {item[0]: item[1] for item in student.items() if item[1] != 0 and item[0] != 'Email'}
            totalData.update_one({'Email': student['Email']}, {'$inc': changed})

def empty():
    dailyData.delete_many({})

sched = BlockingScheduler()

def scheduleJobs():
    sched.add_job(initTotal, 'cron', hour='21', minute='20', second='00')
    sched.add_job(updateDaily, 'cron', hour='21', minute='35', second='00')
    # empty the daily database
    sched.add_job(empty, 'cron', hour='00', minute='00', second='00')
    # sched.add_job(empty, 'interval', seconds=5)
    sched.start()

if __name__ == '__main__':
    scheduleJobs()
