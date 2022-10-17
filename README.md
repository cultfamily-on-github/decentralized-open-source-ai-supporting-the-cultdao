# Decentralized Open Source AI Supporting The CULTDAO 
The content of this repository enables things like the [CULT Telegram Bot](https://t.me/cultmagazine_bot), the [cultbeast.org](https://cultbeast.org), and corresponding discord-, slack- etc. integrations.

The goal of this repo is to leverage AI technology to support the [CULTDAO](https://cultdao.io) and with that values like freedom, fairness and love.  

## Features 
1. Answer FAQs around the CULT according to the [training data](https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/src/node-nlp-server/training-data.ts)  
2. Send daily reminders - e.g. about the [CULT Game of the Day](https://cultplayground.org)   
3. Send custom messages to inform subscribers around important news via the bot ui for manual updates    
4. Provide AI related education to ensure that - if AI is used - the best AI is used to strengthen freedom, fairness and love 

## Training Data
If people would like to improve the skills of the [CULT Telegram Bot](https://t.me/cultmagazine_bot), they might want to update the corresponding [training data](https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/src/node-nlp-server/training-data.ts).  
  
The [training data](https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/src/node-nlp-server/training-data.ts) of the [CULT Telegram Bot](https://t.me/cultmagazine_bot) mainly consists of mappings from utterances to intents and from intents to potential answers, which the bot gives to the one who is asking for it.  

## Ideas
Feel free to share feature ideas via [this form](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/issues/new).  

## Models & Algorithms
### Assumptions & Approaches
Solution approaches which can be explicitly described by a programmer in an appropriate amount of time shall be defined as algorithms.   

Solution approaches which can not be explicitly described by a programmer in an appropriate amount of time shall be generated as a model leveraging neural nets. This is when many people start talking about AI -> machine learning -> [deep learning](https://www.youtube.com/watch?v=7sB052Pz0sQ).

This is why we use the model based approach for the Natural Language Processing Part e.g. for the [CULT Telegram Bot](https://t.me/cultmagazine_bot). 

The explicit algorithm approach would be very time consuming for programmers resp. for [training data](https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/src/node-nlp-server/training-data.ts) maintainers when compared to the model based approach because by using the model based approach we make sure that the [CULT Telegram Bot](https://t.me/cultmagazine_bot) can easily tolerate typos and unusual wording in general.

### Learning Opportunities
If people are interested in contributing to this repository, they can explore, differentiate and reasonably combine [deep learning](https://www.youtube.com/watch?v=7sB052Pz0sQ) / reinforcement learning / supervised and unsupervised learning in order to improve assets like the [CULT Telegram Bot](https://t.me/cultmagazine_bot).   

In the specific context of Natural Language Processing (NLP) people can explore, differentiate and reasonably combine Natural Language Understanding (NLU) and Natural Language Generation (NLG). In the NLU context it might be interesting to continuously improve the intent matching and entity extraction as an open source contribution to [node-nlp](https://github.com/axa-group/nlp.js#readme). 

This repository might evolve so that it allows to leverage [convolutional neural networks](https://www.youtube.com/watch?v=QzY57FaENXg) and [recurrent neural networks](https://www.youtube.com/watch?v=AsNTP8Kwu80) for many further use cases e.g. in the context of trading volume predictions which might be valuable to predict the value within the CULT & RVLT treasury at a certain point in the future. Additionally such approaches might professionalize decentralized long term investment strategies optimizing e.g. the bollinger bands based approach [drafted here](https://github.com/cultfamily-on-github/cult-bollinger-bands-based-investment-smart-contract). 

For people who like learning with flash cards the [fancy flash cards web app](https://github.com/cultfamily-on-github/fancy-flash-cards/blob/master/README.md) might be cool.

## Programming
To ensure people can easily reuse the assets we bring to the table, we foster clear separation of concerns, high cohesion and loose coupling in our microservices architecture. Improvement proposals via [Pull Requests](https://www.youtube.com/watch?v=8lGpZkjnkt4) are welcome.  

### We love Open Source Programmers

Specific open source components we use for this are:   
1. [telegram_chatbot](https://deno.land/x/telegram_chatbot)     
2. [telegram_bot_ui](https://deno.land/x/telegram_bot_ui)  
3. [node-nlp](https://www.npmjs.com/package/node-nlp)  
4. [ts-node](https://www.npmjs.com/package/ts-node) (TypeScript is Javascript that scales)

### Start it Locally
 
#### The CULT Bot Server

Execute the following command to start the CULT Bot Server. 

```sh
./src/start-cult-bot-server.sh locally
```
#### The Node NLP Server

Execute the following command to start the CULT NLP Server serving via port 8081. 

```sh
cd src/node-nlp-server
npm i
cd ../../
./src/start-cult-node-nlp-server.sh 8081 
```
#### The CULT Telegram Bot

In the main project folder execute the following command to start the CULT Magazine Bot.    
```sh
deno run --allow-read --allow-net --allow-env --allow-write src/start-cult-telegram-bot.ts
```

#### The Bot UI for the "send custom message feature"
In the bot-ui-for-manual-updates folder execute:  

```sh
deno run --allow-read --allow-net --allow-env --unstable src/start-ui-server-for-manual-updates.ts 8042
```

#### The Admin Server (incl. Sentiment Analyzer)
```sh 
deno run --allow-read --allow-net --allow-env --allow-write --unstable src/start-admin-server.ts 3001
```

### Start it in Production

#### The CULT Bot Server

Execute the following command to start the CULT Bot Server. 

```sh
./src/start-cult-bot-server.sh productionmode
```
#### The Node NLP Server
You need to have [pm2](https://www.npmjs.com/package/pm2) installed (npm i -g pm2).

In the node-nlp-server folder execute the following commands to start the CULT NLP Server serving via port 8081 

```sh
cd src/node-nlp-server
npm i
cd ../../
pm2 start ./src/start-cult-node-nlp-server.sh -- 8081
```

###### Advanced Considerations
If you run the node nlp server on a different machine than the telegram bot itself, you might open port 8081 for tcp.  
For this scenario, you might want to add rate limiting via apikeys etc. 

```sh 
ufw allow 8081/tcp
```

#### The CULT Telegram Bot

In the main project folder execute the following command to start the CULT NLP Server serving via port 8081    
```sh
pm2 start src/start-cult-telegram-bot.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-env --allow-net --allow-write"
```


#### The Bot UI for the "send custom message feature"
In the bot-ui-for-manual-updates folder execute:  

```sh
pm2 start src/start-ui-server-for-manual-updates.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-net --allow-env --unstable" -- 8042
```

#### The Admin Server (incl. Sentiment Analyzer)
```sh 
pm2 start src/start-admin-server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-net --allow-env --allow-write --unstable" -- 8055

```

## Manual on How to Monetize Such Contributions
Explore how [Revolt 2 Earn](https://rumble.com/v1lf3yb-revolt-2-earn-in-100-seconds-michael-saylor-talks-about-revolt-2-earn.html) works.  

Submit an [act of revolt](https://revolt.cultdao.io/submitProposal). 

You can regard the following as an example:

### Name
I have programmed an FAQ Service, CULTMander Reminder Service, Game of the Day Reminder Service

### Handle
https://twitter.com/Peer2peerE

### Description
Many of you are talking about CULT with people who already talk about CULT. I can imagine it would be even better to talk about CULT with people who do not yet know about CULT to gain reach for the CULT. So please share the following links with all your neighbors, friends, colleagues and relatives.

1. https://cultbeast.org
2. https://t.me/cultmagazine_bot 

Just do it. Invite newbies to crypto & cult and show them where they get the information they need to start to support the CULT.

If you click reject please give me feedback on why you reject this proposal so that I can continuously improve my acts of revolt easily.

1070 got rejected 
1096 got rejected 
So I try it a third time with reduced reward claim of 0.1 WETH

Feedback and further FAQ examples are welcome https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/4



### Evidence Link
https://cultbeast.org

### Worth
0.5 WETH (first attempt)
0.25 WETH (second attempt)
0.1 WETH (third attempt)

### Wallet
0x9E972a43B3B8D68cD70930697E16429E47E88151

### Transaction of this Proposal
https://polygonscan.com/tx/0x616fad2a885e5257697c555ff072ca39c03aad542b56e2a785dc44a9ffe00445 

### Act of Revolt ID
1070 (first attempt - got rejected 71 vs. 70 votes) 
1096 (second attempt - got rejected)
third attempt coming :)

### Transaction of Reward
Proposal Pending - see [pending proposals](https://revolt.cultdao.io/pendingProposal)  


