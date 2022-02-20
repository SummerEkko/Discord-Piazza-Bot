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

## Reference: 
[Piazza Reference](https://www.businesswire.com/news/home/20210126005439/en/Leading-Colleges-and-Universities-Across-the-U.S.-Select-the-Piazza-QA-Platform-for-Enhanced-Virtual-Learning-Experiences#:~:text=Piazza%20has%20been%20used%20by,license%2C%20visit%20our%20license%20page)
