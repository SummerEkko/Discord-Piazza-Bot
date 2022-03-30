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

def updateTotal():
    """
    Overwrite total data database with latest data
    """
    totalData.delete_many({})
    allData = ps.pull_data(username, password, networkID)
    totalData.insert_many(allData)

def updateDaily():
    """
    Overwrite daily data database with latest data
    """
    dailyData.delete_many({})
    allData = ps.pull_data(username, password, networkID)
    for student in allData:
        obs = totalData.find_one({'Email': student['Email']})
        for key in student.keys():
            if key != 'Email':
                student[key] -= obs[key]
    dailyData.insert_many(allData)

sched = BlockingScheduler()

def scheduleJobs():
    sched.add_job(updateTotal, 'cron', hour='21', minute='20', second='00')
    sched.add_job(updateDaily, 'cron', hour='21', minute='35', second='00')
    sched.start()

if __name__ == '__main__':
    scheduleJobs()
