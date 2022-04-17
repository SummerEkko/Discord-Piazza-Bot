# Acceptance Tests

Note: Points and places of emails may vary depending on if you engage with posts in Piazza outside of the instructions provided, or if another user is interacting with the forum at the same time. If you complete the use cases out of the order we have provided (1 -> 4 -> 2 -> 3), you may also see differences in points.

Points are calculated based on parameters for each type of participation activity in Piazza. They are all set to 1 by default. Liking your own posted content does not count. Ideally, performance summary and private bot messages should only be sent once a day, but to show our use case works, they are sent every 10 seconds.

The below code snippet is the Cron time scheduler to schedule the performance summary and private bot messages sent every 10 seconds. To schedule this task to send daily, we can simply change `'*/10 * * * * *'` in the second line to something like `'0 0 0 * * *'`. This way, a message will be sent at 12 A.M. EST everyday.

```{js}
let scheduledMessage = new cron.CronJob(
   '*/10 * * * * *',
   async () => {
       studentFunc.dailyTop(mongoose).then(res => {
           channel.send(res);
           console.log("Daily top sent");
       })
   },
   null,
   true,
   'America/New_York'
);
```

## Use Case 1

First, join our test Piazza course (see email invite) and our Discord server (https://discord.gg/PeqmjFHJ6t).

### Login

In the #general channel, type "/". From the list of Discord commands, select the `/login` command with the description "Log in with piazza email and password for instructor". There are three parameters: "email", "password", and "network-id". These values are provided via the Google form. Send the message and check that the bot replies with a private message in the channel: "Login success".

Default performance score parameters: Check that the #cron channel is sending messages like this:

"Top 3 Daily Points
1. *some email* - 0
2. *some email* - 0
3. *some email* - 0"

Go to Piazza and post a public question. Post an answer and follow-up to your question. Now check the #cron channel in Discord and wait up to a minute. You should see a few messages like this:

"Top 3 Daily Points
1. *your email* - 3
2. *some email* - 0
3. *some email* - 0"

***Private Piazza activity:*** Wait until the #cron channel is sending messages with 0 points for all places again, then go to Piazza and post a private question. Wait up to a minute and check the #cron channel. You should still only see messages with 0 points for all places. Private posts in Piazza are not counted toward points.

### Set performance score parameters
In the #general channel, type "/". From the list of Discord commands, select the `/set` command with the description "Set parameters for points". There are four parameters: "p1", "p2", "p3", and "p4". Enter "2", "3", "1", and "4" as the respective parameter values, then send the message. Check that the bot returns the following message in the channel:

"Parameters:
Questions asked: 2
Answers to questions: 3
Most views: 1
Endorsement by other users: 4"

Go to Piazza and post a public question with your name shown. Post an answer and follow-up to your question. Now check the #cron channel in Discord and wait up to a minute. You should see a few messages like this:

"Top 3 Daily Points
1. *your email* - 8
2. *some email* - 0
3. *some email* - 0"

### Invalid performance score parameters
In the general channel, try sending the `/set` command with the parameter values "11", "0", "10.5", and "-1". Check that Discord does not allow you to send the command.

## Use Case 4

### Download data
In the #general channel in the Discord server, send the command `/download-csv`.

Check that the bot returns a message in the channel "CSV file generated." with a CSV file called "piazza.csv". Check that the first row of the CSV files is: "Email","Questions","Answers","Views","Endorsements","_id","__v". The other rows contain data on students in the Piazza course. Check that the number of questions, answers, views, and endorsements multiplied by the parameters from the `/set` command is equal to the number of points for each student:

Points = Questions * p1 + Answers * p2 + Views * p3 + Endorsements * p4

Note: Whenever you set the point parameters with the `/set` command, you will need to wait for 1-2 minutes for the total points to be updated correctly when you use the `/download-csv` command.

## Use Case 2

### Same role for all users
Check that in the list of Discord server users on the right, there are no roles assigned. All users should either be labeled "Online" or "Offline".

In the #general channel in the Discord server, type "/". From the list of Discord commands, select the `/customize-roles` command with the description "Customize your three roles with incremental points". There are four parameters: "l1", "l2", "l3", and "incremental". Enter "Level1", "Level2", "Level3", and "1000" as the respective parameter values, then send the message. Check that the bot returns the following message in the channel:

"Your input:
GuildID: your Discord id, which you can verify with the `/user` command (Look for "Your id: *id*" in the bot's return message)
Level 1 name: Level1
Level 2 name: Level2
Level 3 name: Level3
increment: 1000"

Check that the list of server users is updated so that you are assigned the "Level1" role. This may take a minute or so.

### Different roles
In the #general channel in the Discord server, type "/". From the list of Discord commands, select the `/customize-roles` command with the description "Customize your three roles with incremental points". There are four parameters: "l1", "l2", "l3", and "incremental". Enter "Level1", "Level2", "Level3", and "1" as the respective parameter values, then send the message. Check that the bot returns the following message in the channel:

"Your input:
GuildID: your Discord id, which you can verify with the `/user` command (Look for "Your id: *id*" in the bot's return message)
Level 1 name: Level1
Level 2 name: Level2
Level 3 name: Level3
increment: 1"

Check that the list of server users is updated so that you are assigned the "Level3" role. This may take a minute or so.

## Use Case 3

### Opt in to private messages
Check that the bot is not sending you private messages at the moment.

In the #general channel, type "/". From the list of Discord commands, select the `/opt-in` command with the description "Opt-in to receive performance data for students". In the text field next to the "email" parameter, enter the email address associated with your Piazza account, then send the message.

Check that the bot returns the following message in the channel: "Your Piazza email: *email entered*". Check for private messages from the bot. You should see some messages like this: "The point you earned today is : 0. Please keep it up!"

Go to our Piazza course and post a public question with your name shown. Post an answer and a follow up to the question. Check that the bot sends you a few messages like this: "The point you earned today is : 8. Please keep it up!"

Check the #cron channel in Discord. You should see a few "Top 3 Daily Points..." messages with your email and positive number of points. Check that the number of points in the message matches the number of points in your private message from the bot.

After a minute or so, the points in the private messages and "Top 3 Daily Points..." messages should revert back to 0.

### Opt out of private messages
In the #general channel, type "/". From the list of Discord commands, select the `/opt-out` command with the description "Opt out of the performance notifications" and send the message.

Check that the bot returns the following message in the channel: "You have opted out of the performance notifications." Check that the bot no longer sends you private messages.

### Invalid opt in
In the #general channel, send the `/opt-in` command again with "abc" next to the "email" parameter to represent at invalid email. Check that the bot returns the following message in the channel: "Your Piazza email: abc". Check that the bot is not sending you private messages.

In the #general channel, send the `/opt-in` command again, but use a valid email that is not associated with your Piazza account for the "email" parameter. Check that the bot returns the following message in the channel: "Your Piazza email: *email entered*". Check that the bot is still not sending you private messages.
