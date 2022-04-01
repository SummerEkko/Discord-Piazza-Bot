## Bot
---

### Bot Implementation

* **Bot Platform**: As discussed in DESIGN.md, fully operational bot was developed based on **Discord**, in which responses/events are triggered by pre-defined commands. 
* **Bot Integration**: Basic converation/interaction with bot are implemented. As of the current BOT implementation, our bot is able to complete the selected uses cases (Use case #1, #3 and #4) below:
    1. By `set` command, users are able to customize performance matrix: Questions asked, Answer to Questions, Most Views, and Endorsement by other users.
    3. By `opt-in` and `opt-out` command, users are able to subscribe/unsubscribe to receive incentive messages.
    4. By `download-CSV` command, users are able to retrieve a copy of overall performance report for all participated students in Piazza.

### Use Case Refinement

We modified all of our use cases to promote student participation in Piazza and simplify the use of our bot for instructors and students.

#### Use Case 1 (modified): Customize daily performance summary sent in the group-sharing Discord channel

* **Modification**: Performance summary will be sent daily instead of weekly to encourage more student participation in Piazza and proactivity in completing assignments.

1. Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2. Main Flow

   Instructor will customize how to evaluate student performance with the Piazza performance matrix [S1]. Bot sends a performance summary daily in the group-sharing Discord channel based on the defined matrix [S2].
   
3. Subflows

   [S1] In the Discord Configuration channel, instructor will issue commands and weigh “Questions asked”, “Answers to questions”, “Most views”, “Endorsement by other users” each on a scale from 1 to 10. 
  
   [S2] Bot calculates the performance score of each student based on the defined performance matrix in [S1] behind the scene. Top performers will be announced along with their statistics in the group-sharing Discord Channel. 
  
4. Alternative Flows

   [E1] Instructor does not specify evaluation matrix. By default, weighing on “Questions asked”, “Answers to questions”, “Most views”,  and “Endorsement by other users” is 1:1:1:1.

#### Use Case 2 (modified): Customize ranking hierarchy (levels and roles) to students based on overall performance

* **Modification**: Remove emojis offered for different roles for simplicity. It could be considered as an extended feature in future development.

1. Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2. Main Flow

   Instructor will customize ranking hierarchy in Discord server by commands [S1].
   
3. Subflows

   [S1] In the Discord server, the instructor will customize the number of points required per level and the naming convention for roles associated with the levels for student participants.
  
4. Alternative Flows

   [E1] N/A

#### Use Case 3 (modified): Subscribe to receive incentive message (up-to-date points earned message) in the private Discord channel
   
* **Modification**: Narrow down message subcription frequency options to daily and disabled for simplicity and to encourage student participation.

1. Preconditions

   Students must register and enroll in a course in Piazza. Plus, students must have a Discord account and join the class channel.
   
2. Main Flow

   Student will associate Piazza account name with a Private Discord channel [S1]. Student will choose a subscription frequency to receive incentive messages [S2]. Bot sends incentive messages in favor of user selection in the private Discord channel [S3].
   
3. Subflows

   [S1] In Discord private channel, student will associate Piazza account by simple commands. 
 
   [S2] Student sends a command to acknowledge how frequently he/she would like to receive incentive messages from the bot. Options are daily and disabled.
 
   [S3] Bot will send incentives messages based on the user's setting in the private Discord channel.
 
4. Alternative Flows

   [E1] Student does not configure subscription frequency. Daily incentive messages will be received by default. 


#### Use Case 4 (modified): Fetching performance summary CSV file as academic record

* **Modification**: Instructor can fetch the performance summary CSV file with a command instead of automatically on a fixed schedule to ensure flexibility. To streamline the data retrieval process and eliminate potential problems with accessing a Docker container, the CSV file will be directly sent to the instructor in Discord.

1. Preconditions

   Instructor must have created a course in Piazza. Plus, student must enroll in the same course in Piazza.
   
2. Main Flow

   Instructor will enter command to fetch overall performance summary CSV file for the purpose of academic record[S1]. Bot generates performance summary in CSV file format and sends to user in Discord [S2].
   
3. Subflows

   [S1] In the Discord channel, instructor will issue commands to fetch overall performance record.
  
   [S2] According to instructor’s input, bot will generate performance records and send in Discord channel.
  
4. Alternative Flows

   [E1] N/A

### Test Coverage

Tests suite achieves >80% code coverage, as measured by `c8`. Test coverage demo is included in screencast below. 

### Mocking Service Component

Code available in the test folder under `dev` branch.

### Screencast

- [Project Milestone Screencast](https://drive.google.com/file/d/1KREQiZcQ44ieOZf7FGXZv_xNx3icEu3Y/view?usp=sharing)
