# Decentralized Open Source AI Supporting The CULTDAO 
The goal of this repo is to leverage AI technology to support the [CULTDAO](https://cultdao.io) and with that values like freedom, fairness and love.  

The content of this repository enables things like the [CULT Telegram Bot](https://t.me/cultmagazine_bot).

## Features 
1. Answer FAQs around the CULT according to the [training data](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/blob/main/node-nlp-server/training-data.ts)   
2. Send daily reminders - e.g. about the [CULT Game of the Day](https://cultplayground.org)   
3. Send custom messages to inform subscribers around important news via the bot ui for manual updates    
4. Provide AI related education to ensure that - if AI is used - the best AI is used to strengthen freedom, fairness and love 

## Training Data
If people would like to improve the skills of the [CULT Telegram Bot](https://t.me/cultmagazine_bot), they might want to update the corresponding [training data](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/blob/main/node-nlp-server/training-data.ts).  
  
The [training data](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/blob/main/node-nlp-server/training-data.ts) of the [CULT Telegram Bot](https://t.me/cultmagazine_bot) mainly consists of a mapping from
1. utterances to intents   
2. intents to potential answers which the bot gives to the one who is asking for it  

## Ideas
Feel free to share feature ideas via [this form](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/issues/new).  

## Programming
To ensure people can easily reuse the assets we bring to the table, we ensure there is clear separation of concerns, high cohesion and loose coupling in our microservices architecture. Improvement proposals via [Pull Requests](https://www.youtube.com/watch?v=8lGpZkjnkt4) are welcome.  

### We love Open Source Programmers

Specific open source components we use for this are:   
1. [telegram_chatbot](https://deno.land/x/telegram_chatbot)     
2. [telegram_bot_ui](https://deno.land/x/telegram_bot_ui)  
3. [node-nlp](https://www.npmjs.com/package/node-nlp)  
4. [ts-node](https://www.npmjs.com/package/ts-node) (TypeScript is Javascript that scales)

### Start it Locally
 
#### The Node NLP Server

In the node-nlp-server folder execute the following command to start the CULT NLP Server serving via port 8081    
```sh
ts-node src/node-nlp-server.ts 8081 
```
#### The CULT Magazine Bot Itself

In the main project folder execute the following command to start the CULT Magazine Bot.    
```sh
deno run --allow-read --allow-net --allow-env src/start.ts
```

#### The Bot UI for the "send custom message feature"
In the bot-ui-for-manual-updates folder execute:  

```sh
deno run --allow-read --allow-net --allow-env bot-ui-server.ts
```

### Start it in Production
#### The Node NLP Server

In the node-nlp-server folder execute the following command to start the CULT NLP Server serving via port 8081 

```sh
ts-node src/node-nlp-server.ts 8081 
```

###### Advanced Considerations
If you run the node nlp server on a different machine than the telegram bot itself, you might open port 8081 for tcp.  
For this scenario, you might want to add rate limiting via apikeys etc. 

```sh 
ufw allow 8081/tcp
```

#### The telegram bot itself

In the node-nlp-server folder execute the following command to start the CULT NLP Server serving via port 8081    
```sh
./start-server.sh
```

#### The Bot UI for the "send custom message feature"
In the bot-ui-for-manual-updates folder execute:  

```sh
pm2 start bot-ui-server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-env --allow-net" -- 8443
```

## Manual on How to Monetize Such Contributions
Submit an [act of revolt](https://revolt.cultdao.io/submitProposal). 

### Name
I have programmed a News Bot for the CULT Mag

### Handle
https://twitter.com/Peer2peerE

### Description
The [News Bot](https://t.me/cultmagazine_bot) ... 

Everyone is invited to support the emergence of manifold architectures of freedom by contributing to the code which can be found here: https://github.com/cultfamily-on-github ... I added the cycle keyword in some commitmessages - see evidencelink.

### Evidence Link
https://github.com/cultfamily-on-github/cultmagazine-for-telegram/commits/main

### Worth
0.25 WETH

### Wallet
0x9E972a43B3B8D68cD70930697E16429E47E88151

### Transaction of this Proposal


### Act of Revolt ID


### Transaction of Reward
