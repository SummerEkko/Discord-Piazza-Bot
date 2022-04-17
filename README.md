# CSC510-10
## Team Members

Kai Gao ([kgao2](mailto:kgao2@ncsu.edu))

Rachel Chen ([rschen](mailto:rschen@ncsu.edu))

Zijun Lu ([zlu5](mailto:zlu5@ncsu.edu))

Zhiyuan Ma ([zma24](mailto:zma24@ncsu.edu))

## Design

[DESIGN.md](DESIGN.md)


## Bot: Milestone
[BOT.md](BOT.md)

## Process: Milestone
[PROCESS.md](PROCESS.md)

## Deploy: Milesone
[DEPLOY.md](DEPLOY.md)

## Installation
1. Node packages
```shell
npm install
```
2. Python packages  
```shell
pip3 install -r requirements.txt
```
This project uses Python3, please make sure you can run `python3` in your terminal.  
You can look at [executeBotPy.js](/utils/executeBotPy.js) for details.
```javascript
const botPy = spawn('python3', ['bot.py', email, password, networkId]);
```


## Discord
https://discord.gg/ndujxUH7Yu

## Configuration
config.json:  
 - Discord **clientId**, **token**   
 - **mongodb** URL  
 - **piazzaUser**, **piazzaPass** and **piazzaNet**



To obtain config.json, please contact us directly.

## Run
```shell
npm run dev
```
