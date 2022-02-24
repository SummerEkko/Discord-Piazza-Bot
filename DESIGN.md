## Problem Statement

Piazza is a popular learning management platform which allows teaching staff and students to interact in a forum-style format. According to Business Wire, Piazza has been used by more than 5 million students and over 100,000 professors from 2,000 schools in 90 countries worldwide, and instruction has expanded from STEM to all disciplines. There is no doubt that Piazza is a useful tool for instructor-student interaction in the software engineering domain. However, we found two main problems that a reward bot would help solve.

The first problem is that Piazza is a paid platform. The unpaid version is available for class sizes of 25 students or less, but hides many useful functionalities. For example, the class participation statistic is disabled, and instructors cannot easily figure out the most active students in the class. If the teaching staff care about students’ participation and would like to provide extra credit to students who contribute the most to the course forum, it will be painful and time consuming to deduce who to reward. Therefore, the introduction of our reward bot will become a lifesaver for instructors struggling with course budget in a small class setting by retrieving Piazza data frequently and in a customizable manner.

Furthermore, the second problem is also related to promoting class participation and performance. Piazza provides a standard interface to allow students to interact with each other in addition to instructors, encouraging productive discussions of class material and resource sharing. However, Piazza does not offer many incentives for students to answer and ask questions, nor activity summaries on a weekly basis. We believe that if a weekly summary of class performance is announced in a shared group channel (e.g. Mattermost), it will greatly increase the initiative of enrolled students to participate. Our reward bot can help achieve this through integration of an open-source and self-hostable online chat service. Teaching staff could set up customized weekly performance summaries to post on the shared channel. 

## Bot Description

Our bot will both send messages and respond to events and commands. 

Firstly, our bot will send a weekly summary of class performance, including the most popular questions and answers and the most active students. This will help instructors get an idea of what concepts students do not understand and want to learn. Also, this could help instructors evaluate student performance and participation and decide which students to reward. Our bot will also send every student their own statistics.

Secondly, our bot will respond to events. For example, if a student earns certain points based on the reward policy, our bot will send a level up message with a badge on Mattermost. The points and levels can be calculated based on statistics such as questions asked and answered, instructor-endorsed answers, and popularity of questions asked.

Thirdly, our bot will reply to commands. Instructors and students can customize searches, such as top questions during a specific period of time and students’ points or levels.

By adding these weekly announcements, the bot will provide a convenient way for instructors to monitor class activity on Piazza and for students to track their individual activity. The reward system will facilitate a way for instructors to encourage contribution to the class forum and conversation around class material. This is especially important for small class sizes, which do not have activity summaries or as many features available as larger class sizes using the paid Piazza platform.

## Tagline

Grow your KPI with our API.

## Use Case

Disclaimer: All use cases are based on the assumption that students must participate in Piazza in public. In other words, if students ask or answer questions anonymously, related performance data will not be captured. Furthermore, anonymous post will be ignored and not evaluated in performance report.

Use Case 1: Customize weekly performance summary sent in the group-sharing Discord channel  
1 Preconditions
   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
2 Main Flow
   Instructor will log in the settings portal with credentials by admin [S1]. Instructor will customize how to evaluate student performance on matrix [S2]. Bot sends a performance summary weekly in the group-sharing Discord channel [S3].
3 Subflows
  [S1] Instructor login to a settings portal with provided credentials @username and @password.
  [S2] Instructor will weigh “Questions asked”, “Answers to questions”, “Most views”, “Endorsement by other users” each on the scale from 1 to 10. 
  [S3] Bot calculates performance score of each student based on customized matrix in [S2]. Top 3 performers will be announced along with their statistics in the group-sharing Discord Channel. 
4 Alternative Flows
  [E1] Instructor does not specify evaluation matrix. By default, weighing on “Questions asked”, “Answers to questions”, “Most views”,  and “Endorsement by other users” is 1:1:1:1.

 Use Case 2: Send student’s temporary password to settings portal upon joining the course Discord channel
1 Preconditions
   Student must register and enroll in a course in Piazza. Plus, student must have a Discord account.
2 Main Flow
   Student will join the course Discord channel[S1]. Bot sends a welcome message with login credential to settings portal[S2].
3 Subflows
  [S1] Student joins the course Discord Channel.
  [S2] Bot will generate 8 random characters password as user temporary password. Bot sends a welcome message with a settings portal link and a temporary password. 
4 Alternative Flows
  [E1] N/A

Use Case 3: Subscribe to receive incentive message (Points earned/Badge up to date message) in the private Discord channel
1 Preconditions
   Students must register and enroll in a course in Piazza. Plus, students must have a Discord account and join the class channel.
2 Main Flow
   Student will log in to the settings portal with credentials provided by instructor [S1]. Student will select subscription frequency to receive incentive messages [S2]. Bot sends incentive messages in favor of user selection in the private Discord channel [S3].
3 Subflows
  [S1] Student login to a settings portal with provided credentials @username and @password.
  [S2] In the settings portal, Student make a selection on how frequently he/she would like to receive incentive messages. Options are daily, weekly and disabled.
  [S3] Bot will send incentives messages based on the user's setting in the Discord channel.
4 Alternative Flows
  [E1] Student does not log in and change his/her settings. Daily incentive messages will be received by default. 

Use Case 4: Customize midterm/final performance summary Excel file
1 Preconditions
   Instructor must have created a course in Piazza. Plus, student must enroll in the same course in Piazza.
2 Main Flow
   Instructor will log in the settings portal with credentials by admin [S1]. Instructor will customize how to evaluate student performance on matrix [S2]. Bot generates midterm/final performance summary in Excel file format [S4].
3 Subflows
  [S1] Instructor login to a settings portal with provided credentials @username and @password.
  [S2] Instructor will weigh “Questions asked”, “Answers to questions”, “Most views”, “Endorsement by other users” each on the scale from 1 to 10 [S3]. Bot calculates the performance score of each student based on a customized matrix in [S2]. All student's performance statistics will be recorded in an Excel spreadsheet.
4 Alternative Flows
  [E1] Instructor user does not specify evaluation matrix. By default, weighing on “Questions asked”, “Answers to questions”, “Most views”,  and “Endorsement by other users” is 1:1:1:1. Also, one midterm and one final performance summary will be generated as an Excel file by default.  
  
 
## Design Sketches  
- Wireframe mockuping of our bot in action.  
&ensp; 1. wireframe for the usercase1:  
![Moodle Pic](https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf1.png)   
&ensp; 2. wireframe for the usercase2:  
![Moodle Pic](https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf2.png)  
&ensp; 3. wireframe for the usercase3:
![Moodle Pic](https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf3.png)

- Storyboard that illustrates the primary task that a user undergoes with bot.  
&ensp; 1. storyboard for the usercase1:   
<div align=center><img width="300" height="300" src="https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/sb1.jpg"/></div>


## Reference: 
[Piazza Reference](https://www.businesswire.com/news/home/20210126005439/en/Leading-Colleges-and-Universities-Across-the-U.S.-Select-the-Piazza-QA-Platform-for-Enhanced-Virtual-Learning-Experiences#:~:text=Piazza%20has%20been%20used%20by,license%2C%20visit%20our%20license%20page)
