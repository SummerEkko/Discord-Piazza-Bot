# Process
---

## Process

Please see our iteration worksheet and GitHub Project for documentation on story creation and assignment at each iteration.

All stories and tasks are logged in our [GitHub Project](https://github.ncsu.edu/csc510-s2022/CSC510-10/projects/1).

See our iteration worksheet here [WORKSHEET.md](WORKSHEET.md).

## Practices

Core practices: Previously, we implemented the design improvement (our design and implementations went through several iterations of planning) practice. There are many design improvement throughout our process, just to name a few.

1. Redesign Discord slash command for customizeRoles to avoid multiple parameter input and input error. The result of that is user will only need to enter 4 parameters input instead of 9. 

2. Improve the database schemas to avoid redundance. 
 
A core practice we did not use before was pair programming. We used pair programming in our sprints when implementing Piazza data collection and storage as well as data collection job scheduling.

Corollary practices: Previously, we implemented shared code (all code available in GitHub) and code & tests (meetings to plan and brainstorm project implementation) practices. A corollary practice we did not use before was team continuity. Before, we did most of our work separately, but for this milestone, we met more often to work on bot implementation. We also practiced shrinking teams (split into two teams for the Piazza data collection and Discord command parts of our bot implementation) and real customer involvement (we are the customer and clarified our stories/needs during development).

See our meeting notes [here](https://docs.google.com/document/d/1AVRSzfsi8DEGgnHe79Td1vbvEZewu9DabqzIXqNt3vk/edit?usp=sharing).

## Consistency

### Work Division

* Database design - everyone
* Piazza data collection - rschen, kgao2
* Database integration with Python - rschen, kgao2
* Database integration with JS - zma24
* Implement assigning level roles in Discord - zma24
* Create mock data for Piazza - everyone
* Research sending public vs. private messages on Discord from bot - zlu5
* Research storing authorization to database - zlu5

User stories:

* Use Case 1: kgao2
* Use Case 2: zma24
* Use Case 3: zlu5
* Use Case 4: rschen

## TA Demo

4/1, 5:30 pm

## Process Reflection

Include documentation of EACH iteration end. Include status of completed and incomplete tasks, and a process reflection.

During iteration/sprint 1, we divided our use cases into stories and assigned tasks. We completed the database design and started early work on Piazza data collection and all of the Discord commands, particularly for assigning roles in Discord. Most of our work during sprint 1 focused on refining our database design and setting up a database in MongoDB. Our completed tasks were the database design and retrieving data from the database in a CSV file (Use Case 4). During iteration/sprint 2, we completed the Piazza data collection and storage, Discord commands, and database integration with data collection and commands parts.

Before the Process milestone, we implemented some of the core and corollary practices such as shared code, design improvement, and real customer involvement. However most of our meetings were to plan and brainstorm rather than work on our implementation. During the sprints, we had more meetings to work on our bot implementation and started using other practices. Making these changes helped our team work more efficiently. Working together in person allowed us to share ideas when someone was stuck and improved our teamwork. Pair programming and shrinking teams especially helped us when we divided our work into the data collection and Discord command parts. Team members could work on tasks together with pair programming, making the implementation process more smooth and efficient. It was also easier for each subteam to find times to meet. Overall, using more practices improved our workflow and communication during the Process milestone.
