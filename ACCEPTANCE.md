# Acceptance Tests

Note: Points and places of emails may vary depending on if you engage with posts in Piazza outside of the instructions provided, or if another user is interacting with the forum at the same time. If you complete the use cases out of the order we have provided (1 -> 4 -> 3 (Part 1) -> 2 -> 3 (Part 2)), you may also see differences in points.

Points are calculated based on parameters for each type of participation activity in Piazza. They are all set to 1 by default. We classify activity into 4 categories: Questions, Answers/Followups, Views, and Endorsements. Questions include notes. Answers/followups include student answers and follow up comments. For endorsements, liking your own posted content (questions, answers, followups) does not count. Private or anonymous posts are not counted in activity. Ideally, performance summary and private bot messages should only be sent once a day, but to show our use case works, they are sent every 10 seconds.

The below code snippet is the Cron time scheduler (located in [events/ready.js](events/ready.js)) to schedule the performance summary and private bot messages sent every 10 seconds. To schedule this task to send daily, we can simply change `'*/10 * * * * *'` in the second line to something like `'0 0 0 * * *'`. This way, a message will be sent at 12 A.M. EST everyday.

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

First, join our test Piazza course (see email invitation, course name is also CSC 510) and our Discord server (https://discord.gg/ndujxUH7Yu). Please contact us if you cannot find the Piazza invitation.

### Login

In the #general channel, type "/". From the list of Discord commands, select the `/login` command with the description "Log in with piazza email and password for instructor". See the list of Discord commands below for reference.

![](images/command_list.jpg)

There are three parameters: "email", "password", and "network-id". These values are provided via the Google form. Send the message and check that the bot replies with a private message in the channel: "Login success".

### Default performance score parameters
Check that the #cron channel is sending messages like this:

"Top 3 Daily Points
1. *some email* - 0
2. *some email* - 0
3. *some email* - 0"

Go to Piazza and post a public question with your name shown. Post an answer and follow-up to your question, then like the question. Now check the #cron channel in Discord and wait up to a minute. You should see a few messages like this:

"Top 3 Daily Points
1. *your email* - *positive number*
2. *some email* - 0
3. *some email* - 0"

The number of points next to your email should be at least 3 (1 question and 2 answers/followups), but may be more depending on the number of views on your post and if there is interaction with/from other Piazza users. You may need to refresh the post to see the views.

## Invalid Piazza activity
Wait until the #cron channel is sending messages with 0 points for all places again, then go to Piazza and post a private question. Wait up to a minute and check the #cron channel. You should still only see messages with 0 points for all places. Private posts in Piazza are not counted toward points. Repeat this with a public post with your name hidden. You should also only see messages with 0 points for all places, because anonymous activity is not counted toward points.

### Set performance score parameters
In the #general channel, type "/". From the list of Discord commands, select the `/set` command with the description "Set parameters for points". There are four parameters: "p1", "p2", "p3", and "p4". Enter "2", "3", "1", and "4" as the respective parameter values, then send the message. Check that the bot returns the following message in the channel:

![](images/set_params.jpg)

Go to Piazza and post a public question with your name shown. Post an answer and follow-up to your question, then like the question. Now check the #cron channel in Discord and wait up to a minute. You should see a few messages like this:

"Top 3 Daily Points
1. *your email* - *positive number*
2. *some email* - 0
3. *some email* - 0"

The number of points next to your email should be at least 8 (1 question and 2 answers/followups), but may be more depending on the number of views on your post and if there is interaction with/from other Piazza users. You may need to refresh the post to see the views.

### Invalid performance score parameters
In the #general channel, try sending the `/set` command with the parameter values "11", "0", "10.5", and "-1". Check that Discord does not allow you to send the command. Try again without entering anything for the parameters and check that you cannot send the command.

## Use Case 4

### Download data
In the #general channel in the Discord server, send the command `/download-csv`.

Check that the bot returns a message in the channel "CSV file generated." with a CSV file called `piazza.csv`. Check that the first row of the CSV files is: `"Email","Questions","Answers","Views","Endorsements","_id","__v"`. The other rows contain data on students in the Piazza course. Check that the number of questions, answers, views, and endorsements multiplied by the parameters from the `/set` command is equal to the number of points for each student:

Points = Questions * p1 + Answers * p2 + Views * p3 + Endorsements * p4

Note: Whenever you set the point parameters with the `/set` command, you will need to wait a little for the total points to be updated correctly when you use the `/download-csv` command.

## Use Case 3: Part 1

### Opt in to private messages
Check that the bot is not sending you private messages at the moment.

In the #general channel, type "/". From the list of Discord commands, select the `/opt-in` command with the description "Opt-in to receive performance data for students". In the text field next to the "email" parameter, enter the email address associated with your Piazza account, then send the message.

Check that the bot returns the following message in the channel: "Your Piazza email: *email entered*". Check for private messages from the bot. You should see some messages like this: "The point you earned today is : 0. Please keep it up!"

Go to our Piazza course and post a public question with your name shown. Post an answer and a follow up to the question. Check that the bot sends you a few messages like this: "The point you earned today is : 8. Please keep it up!"

Check the #cron channel in Discord. You should see a few "Top 3 Daily Points..." messages with your email and positive number of points. Check that the number of points in the message matches the number of points in your private message from the bot.

After a minute or so, the points in the private messages and "Top 3 Daily Points..." messages should revert back to 0.

## Use Case 2

Important note: You must opt in to direct messages from the bot (See Use Case 3) in order to set your role. Otherwise, your role will not update.

### No role
Check that in the list of Discord server users on the right, there are no roles assigned. All users should either be labeled "Online" or "Offline".

In the #general channel in the Discord server, type "/". From the list of Discord commands, select the `/customize-roles` command with the description "Customize your three roles with incremental points". There are four parameters: "l1", "l2", "l3", and "incremental". Enter "Level 1", "Level 2", "Level 3", and "1000" as the respective parameter values, then send the message. Check that the bot returns the following message in the channel:

![](images/level_roles.jpg)

(Important Note: Please ensure you enter parameters as exactly the above "Level 1". Please be aware of the space between "Level" and "1". Otherwise, our system will just remove all the associated roles from the users)

Wait for a minute and check that you are not assigned any role. (The increment defines the number of points you must earn to reach a new level. All users start with no level.)

### Lowest role
Repeat the **No role** section instructions with the same parameter values, except for the "incremental" parameter, enter the number of points you have (see `piazza.csv` from the `/download-csv` command). Check that the bot returns a message like the one in the **No role** section, except with a different number of points next to "increment :".

Check that the list of server users is updated so that you are assigned the "Level 1" role. This may take a minute or so. (Note: If you have not posted anything on Piazza (i.e. enter 0 for the "incremental" parameter), you will not have an assigned level.)

### Highest role
Repeat the **No role** section instructions with the same parameter values, except for the "incremental" parameter, enter "1". Check that the bot returns the following message:

![](images/level_roles_1.jpg)

Check that the list of server users is updated so that you are assigned the "Level 3" role. This may take a minute or so. (This is dependent on whether you have already posted something on Piazza. Otherwise, you may have no points.)

## Use Case 3: Part 2

### Opt out of private messages
In the #general channel, type "/". From the list of Discord commands, select the `/opt-out` command with the description "Opt out of the performance notifications" and send the message.

Check that the bot returns the following message in the channel: "You have opted out of the performance notifications." Check that the bot no longer sends you private messages.

### Invalid opt in
In the #general channel, send the `/opt-in` command again with "abc" next to the "email" parameter to represent at invalid email. Check that the bot returns the following message in the channel: "Your Piazza email: abc". Check that the bot is not sending you private messages. Try this again without entering anything for an email and with a valid email not associated with your Piazza account. Check that the bot returns a message in the channel: "Your Piazza email: *your input*" but does not send you private messages.
