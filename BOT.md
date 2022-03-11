## Bot
---

### Bot Implementation

In implementing your bot, you will have to primary tasks:

* **Bot Platform**: As discussed in DESIGN.md, fully operational bot was developed based on **Discord**, in which responses/events are triggered by pre-defined commands. 
* **Bot Integration**: Basic converation/interaction with bot are implemented. As of phase of current BOT implementation, our bot is able to complete the selected uses cases (Use case #1, #3 and #4) below:
    1. By **set** command, users are able to customize performance matrix: Questions asked, Answer to Questions, Most Views, and Endorsement by other users.
    2. By **optin** and **optout** command, users are able to subscribe/unscribe to receive incentive messages.
    3. By **download_CSV** command, users are able to retrieve a copy of overall performance report for all participated students in Piazza.
  Implement basic conversation/interaction with bot. You need to support the ability to fully have an interaction with an bot as defined by your use cases.

### Use Case Refinement

Based on the feedback from your design milestone and your initial implementation, improve the use cases for your bot. This should be your final iteration of your use case design, it will be very difficult to change past this point.

Describe the changes you made to improve the design of your use cases.

#### Use Case 1 (modified): Customize daily performance summary sent in the group-sharing Discord channel

* **Modification**: Performance summary will be sent daily instead of weekly as to encourage better proactivity. 

1. Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2. Main Flow

   Instructor will customize how to evaluate student performance with the Piazza performance matrix [S1]. Bot sends a performance summary daily in the group-sharing Discord channel based on the defined matrix [S2].
   
3. Subflows

  [S1] In the Discord Configuration channel, instructor will issue commands and weigh “Questions asked”, “Answers to questions”, “Most views”, “Endorsement by other users” each on a scale from 1 to 10. 
  
  [S2] Bot calculates the performance score of each student based on the defined performance matrix in [S1] behind the scene. Top performers will be announced along with their statistics in the group-sharing Discord Channel. 
  
4. Alternative Flows

  [E1] Instructor does not specify evaluation matrix. By default, weighing on “Questions asked”, “Answers to questions”, “Most views”,  and “Endorsement by other users” is 1:1:1:1.

#### Use Case 2 (modified): Customize ranking hierarchy (level roles) to students based on overall performance

* **Modification**: Remove exlusive emojis offering for different roles for simplicity. It might be separate feature for future development as an extension.

1. Preconditions

   Instructor must have created a course in Piazza. Plus, instructor must have a Discord account and set up a class channel.
   
2. Main Flow

   Instructor will customize ranking hierarchy in Discord server by commands [S1].
   
3. Subflows

  [S1] In the Discord server, the instructor will customize the number of points required per level and associated role naming convention for student participants.
  
4. Alternative Flows

  [E1] N/A

#### Use Case 3 (modified): Subscribe to receive incentive message (up-to-date points earned message) in the private Discord channel
   
* **Modification**: Subcription frequency options narrow down to daily and disabled for simplicity. 

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

* **Modification**: Fetching performance summary CSV file with command instead of fixed schedule to ensure flexibility. To avoid inconvenient to look up docker container, CSV file will be sent in Discord instead. 

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

Code available in test folder.

### Screencast

Create a screencast of your bot performing your three primary use cases. Demonstrate your tests being executed.

## Deliverables

Add your code, and BOT.md document describing the following materials.

* Bot Platform Implementation (20%)
* Use Cases Refinement (10%)
* Testing  (30%)
* Mocking infrastructure (30%)
* Screencast (10%)

**Contribution requirements**: Each team member must make contributions on a milestone (e.g., committing code, being assigned and completing tasks). Failure to perform any work will result in no credit for a team member for the milestone.

**Secrets**: Including secrets (passwords, tokens, etc.) in your source code or checked into repository, will result in significant deductions to your grade.

DUE: Thursday, March 10th, before midnight.
