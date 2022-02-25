## Problem Statement

Piazza is a popular learning management platform that allows teaching staff and students to interact in a forum-style format. According to Business Wire, Piazza has been used by more than 5 million students and over 100,000 professors from 2,000 schools in 90 countries worldwide, and instruction has expanded from STEM to all disciplines. There is no doubt that Piazza is a useful tool for instructor-student interaction in the software engineering domain. However, there are two problems that a reward bot would help solve.

The first problem is that Piazza is a paid platform. The unpaid version is available for classes of 25 students or less, but hides many useful functionalities. For example, f the class participation statistic is disabled, instructors cannot easily figure out the most active students in the class. If the teaching staff care about students’ participation and would like to provide extra credit to students who contribute the most to the course forum, it will be painful and time consuming to deduce who to reward. Therefore, the introduction of our reward bot will become a lifesaver for instructors struggling with course budget in a small class setting by retrieving Piazza data frequently and in a customizable manner.

Furthermore, the second problem is also related to promoting class participation and performance. Piazza provides a standard interface for students to interact with each other and instructors with the goal of encouraging productive discussions and resource sharing. However, Piazza does not offer many incentives for students to answer and ask questions, nor activity summaries on a weekly basis. We believe that if a weekly summary of class performance is announced in a shared group channel (e.g. on Discord), it will greatly increase the initiative of enrolled students to participate. Our reward bot can help achieve this through the integration of an open-source and self-hostable online chat service. Teaching staff could set up customized weekly performance summaries to post on a shared channel.

## Bot Description

Our bot will send messages, some of which will be in response to events.

The bot will send a weekly summary of class performance in a shared Discord channel, including popular questions and answers and the most active students. This will help instructors see what concepts confuse students and evaluate student participation. Our bot can also send students regular private updates on points earned based on performance. In addition to the weekly summary, the bot will send daily update messages on student level ups. When students reach certain amounts of points based on an instructor-defined reward policy, they can increase their level. Points and levels can be calculated based on statistics such as numbers of questions and answers, endorsements and likes, and views on questions.

By adding these regular announcements, the bot will provide a convenient way for instructors to monitor class activity on Piazza and for students to track their individual activity. The reward system will facilitate a way for instructors to encourage contribution to the class forum and conversation around class material. This is especially important for small class sizes, which do not have activity summaries or as many features available as larger class sizes using the paid Piazza platform.

## Tagline

Grow your KPI with our API.

## Use Case

Disclaimer: All use cases are based on the assumption that students must participate in Piazza in public. In other words, if students ask or answer questions anonymously, related performance data will not be captured. Furthermore, anonymous post will be ignored and not evaluated in performance report.

### Use Case 1: Customize weekly performance summary sent in the group-sharing Discord channel

1 Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2 Main Flow

   Instructor will customize how to evaluate student performance with the Piazza performance matrix [S1]. Bot sends a performance summary weekly in the group-sharing Discord channel based on the defined matrix [S2].
   
3 Subflows

  [S1] In the Discord Configuration channel, instructor will issue commands and weigh “Questions asked”, “Answers to questions”, “Most views”, “Endorsement by other users” each on a scale from 1 to 10. 
  
  [S2] Bot calculates the performance score of each student based on the defined performance matrix in [S1]. Top 3 performers will be announced along with their statistics in the group-sharing Discord Channel. 
  
4 Alternative Flows

  [E1] Instructor does not specify evaluation matrix. By default, weighing on “Questions asked”, “Answers to questions”, “Most views”,  and “Endorsement by other users” is 1:1:1:1.

### Use Case 2: Customize ranking hierarchy (level roles/unique emoji) to students based on overall performance

1 Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2 Main Flow

   Instructor will customize ranking hierarchy in Discord server [S1].
   
3 Subflows

  [S1] In the Discord server, the instructor will customize the number of points per level and assign emojis to levels for students’ reward with commands.
  
4 Alternative Flows

  [E1] N/A

### Use Case 3: Subscribe to receive incentive message (up-to-date points earned message) in the private Discord channel

1 Preconditions

   Students must register and enroll in a course in Piazza. Plus, students must have a Discord account and join the class channel.
   
2 Main Flow

   Student will associate Piazza account name with a Private Discord channel [S1]. Student will choose a subscription frequency to receive incentive messages [S2]. Bot sends incentive messages in favor of user selection in the private Discord channel [S3].
   
3 Subflows

 [S1] In Discord private channel, student will associate Piazza account by simple commands. 
 
 [S2] Student sends a command to acknowledge how frequently he/she would like to receive incentive messages to the bot. Options are daily, weekly and disabled.
 
 [S3] Bot will send incentives messages based on the user's setting in the private Discord channel.
 
4 Alternative Flows

  [E1] Student does not configure subscription frequency. Daily incentive messages will be received by default. 

### Use Case 4: Customize midterm/final performance summary CSV file as academic record

1 Preconditions

   Instructor must have created a course in Piazza. Plus, student must enroll in the same course in Piazza.
   
2 Main Flow

   Instructor will select auto-downloading performance records for course milestones, such as midterm or final [S1]. Bot generates midterm/final performance summary in CSV file format and saves in docker container [S2].
   
3 Subflows

  [S1] In the Discord Configuration channel, instructor will issue commands to configure certain dates to auto-download performance records.
  
  [S2] According to instructor’s input, bot will generate performance records and save them in the Docker container.
  
4 Alternative Flows

  [E1] If the instructor user does not specify the need of keeping academic performance records. By default, only the final performance summary will be generated and save in the docker.

  
 
## Design Sketches  
- Wireframe mockuping of our bot in action.  
&ensp; 1. wireframe for the usercase1:  
![Moodle Pic](https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf1.png)   
&ensp; 2. wireframe for the usercase2:  
![Moodle Pic](https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf2.png)  
&ensp; 3. wireframe for the usercase3:
<div align=center><img width="700" height="500" src="https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/wf3.png"/></div>

- Storyboard that illustrates the primary task that a user undergoes with bot.  
&ensp; 1. storyboard for the usercase1:   
<div align=center><img width="700" height="500" src="https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/sb1.jpg"/></div>  
&ensp; 2. storyboard for the usercase2:   
<div align=center><img width="700" height="500" src="https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/sb2.jpg"/></div>  
&ensp; 3. storyboard for the usercase3:   
<div align=center><img width="700" height="500" src="https://github.ncsu.edu/csc510-s2022/CSC510-10/blob/main/Design%20sketches%20Image/sb3.jpg"/></div>


## Reference: 
[Piazza Reference](https://www.businesswire.com/news/home/20210126005439/en/Leading-Colleges-and-Universities-Across-the-U.S.-Select-the-Piazza-QA-Platform-for-Enhanced-Virtual-Learning-Experiences#:~:text=Piazza%20has%20been%20used%20by,license%2C%20visit%20our%20license%20page)
