# Iteration Worksheet
---

## Week 1

| Deliverable    | Item/Status   |  Issues/Tasks
| -------------- | ------------  |  ------------
| **Use Case 1** | **Customize daily performance summary**                         | &nbsp;
| Scenario       | Ability to define default/custom performance evaluation metric  |  #37
| Scenario       | Ability to rank students based on instructor-defined metric     |  #38, #42
| Scenario       | Ability to send information from Piazza to Discord              |  #32, #38
| Unit Tests     | Incomplete    | [Restricted command](test/test.js#L54), [Custom weight matrix](test/test.js#L63)
| **Use Case 2** | **Customize performance hierarchy ranking**                           | &nbsp;
| Scenario       | Ability to assign level roles to students in Discord                  |  #33
| Scenario       | Ability to set custom ranking hierarchy/points per level (instructor) |  #34
| Unit Tests     | Incomplete    | &nbsp;
| **Use Case 3** | **Subscribe to incentive message**                                                     | &nbsp;
| Scenario       | Ability to store and retrieve Piazza data in a database                                |  #39, #42
| Scenario       | Ability to create and send incentive messages in Discord by student/default preference |  #40, 41
| Unit Tests     | Incomplete    | [Bad login](test/test.js#L77), [Good login](test/test.js#L84), [Invalid class](test/test.js#L93), [Opt in](test/test.js#L104), [Opt out](test/test.js#L110)
| **Use Case 4** | **Fetch performance summary file**                 | &nbsp;
| Scenario       | Ability to retrieve data from database as CSV file |  #35, #42
| Scenario       | Ability to send file to instructor in Discord      |  #36
| Unit Tests     | Incomplete    | [Create report](test/test.js#L120)
  
## Week 2

| Deliverable    | Item/Status   |  Issues/Tasks
| -------------- | ------------  |  ------------
| **Use Case 1** | **Customize daily performance summary**                         | &nbsp;
| Scenario       | Restricted command should only be used by instructor in server  |  #54
| Unit Tests     | Complete    | [Restricted command](test/test.js#L54), [Custom weight matrix](test/test.js#L63)
| **Use Case 2** | **Customize performance hierarchy ranking**                           | &nbsp;
| Scenario       | Ability to set custom ranking hierarchy/points per level (instructor) |  #34
| Scenario       | Created slash command and point assignment scheme |  #48
| Unit Tests     | Complete    | &nbsp;
| **Use Case 3** | **Subscribe to incentive message**                                                     | &nbsp;
| Scenario       | Student associates Piazza account to Discord ID                                |  #40
| Scenario       | Student opt in/opt out for incentive message |  #41
| Unit Tests     | Complete    | [Bad login](test/test.js#L77), [Good login](test/test.js#L84), [Invalid class](test/test.js#L93), [Opt in](test/test.js#L104), [Opt out](test/test.js#L110)
| **Use Case 4** | **Fetch performance summary file**                 | &nbsp;
| Scenario       | Connect bot to database and retrieve correct data in .csv format to be sent to the instructor via Discord |  #35
| Scenario       | Send data file to instructor once in a private Discord channel after data is retrieved after instructor issues /download command      |  #36
| Unit Tests     | Complete    | [Create report](test/test.js#L120)
| **Database Work** | **Scrape data from Piazza**                 | &nbsp;
| Scenario       | Use data collection functions to update collections in MongoDB database |  #50  
| Scenario       | Use data collection functions to update collections in MongoDB database |  #52  
| Scenario       | Change student data collection to exclude endorsements from original poster |  #52 



