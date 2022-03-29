import pymongo
import piazza_scrape as ps

server_link = "" # server url in config.json
myClient = pymongo.MongoClient(server_link)

mydb = myClient["CSC-510-DB"]
totalDataTemp = mydb["totalDataTemp"]

network_id = "" # network id in config.json
allData = ps.pull_data(network_id)
dataList = []

for info in allData:
    dataList.append({info[0]: info[1:]})

# print(allData[1])
# for k in dataDict:
#     print(k, dataDict[k])
#     break
# print(dataList)
totalDataTemp.insert_many(dataList)
