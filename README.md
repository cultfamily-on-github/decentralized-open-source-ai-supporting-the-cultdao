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
  
The [training data](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/blob/main/node-nlp-server/training-data.ts) of the [CULT Telegram Bot](https://t.me/cultmagazine_bot) mainly consists of mappings from utterances to intents and from intents to potential answers, which the bot gives to the one who is asking for it.  

## Ideas
Feel free to share feature ideas via [this form](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/issues/new).  

## Models & Algorithms
### Assumptions & Approaches
Solution approaches which can be explicitly described by a programmer in an appropriate amount of time shall be defined as algorithms.   

Solution approaches which can not be explicitly described by a programmer in an appropriate amount of time shall be generated as a model leveraging neural nets. This is when many people start talking about AI -> machine learning -> [deep learning](https://www.youtube.com/watch?v=7sB052Pz0sQ).

This is why we use the model based approach for the Natural Language Processing Part e.g. for the [CULT Telegram Bot](https://t.me/cultmagazine_bot). 

The explicit algorithm approach would be very time consuming for programmers resp. for [training data](https://github.com/cultfamily-on-github/cultmagazine-for-telegram/blob/main/node-nlp-server/training-data.ts) maintainers when compared to the model based approach because by using the model based approach we make sure that the [CULT Telegram Bot](https://t.me/cultmagazine_bot) can easily tolerate typos and unusual wording in general.

### Learning Opportunities
If people are interested in contributing to this repository, they can explore, differentiate and reasonably combine [deep learning](https://www.youtube.com/watch?v=7sB052Pz0sQ) / reinforcement learning / supervised and unsupervised learning in order to improve assets like the [CULT Telegram Bot](https://t.me/cultmagazine_bot).   

In the specific context of Natural Language Processing (NLP) people can explore, differentiate and reasonably combine Natural Language Understanding (NLU) and Natural Language Generation (NLG). In the NLU context it might be interesting to continuously improve the intent matching and entity extraction as an open source contribution to [node-nlp](https://github.com/axa-group/nlp.js#readme). 

This repository might evolve so that it allows to leverage [convolutional neural networks](https://www.youtube.com/watch?v=QzY57FaENXg) and [recurrent neural networks](https://www.youtube.com/watch?v=AsNTP8Kwu80) for many further use cases e.g. in the context of for trading volume predictions which might be valuable to predict the value within the CULT & RVLT treasury at a certain point in the future. Additionally such approaches might professionalize decentralized long term investment strategies optimizing e.g. the bollinger bands based approach [drafted here](https://github.com/cultfamily-on-github/cult-bollinger-bands-based-investment-smart-contract). 

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
 
#### The Node NLP Server

In the node-nlp-server folder execute the following command to start the CULT NLP Server serving via port 8081. 

```sh
npm i
ts-node src/node-nlp-server.ts 8081 
```
#### The CULT Magazine Bot Itself

In the main project folder execute the following command to start the CULT Magazine Bot.    
```sh
deno run --allow-read --allow-net --allow-env --allow-write src/cult-telegram-bot.ts
```

#### The Bot UI for the "send custom message feature"
In the bot-ui-for-manual-updates folder execute:  

```sh
deno run --allow-read --allow-net --allow-env bot-ui-server.ts
```

### Start it in Production
#### The Node NLP Server
You need to have [pm2](https://www.npmjs.com/package/pm2) installed (npm i -g pm2).

In the node-nlp-server folder execute the following commands to start the CULT NLP Server serving via port 8081 

```sh
npm i
pm2 start ./cult-node-nlp-server.sh -- 8081
```

###### Advanced Considerations
If you run the node nlp server on a different machine than the telegram bot itself, you might open port 8081 for tcp.  
For this scenario, you might want to add rate limiting via apikeys etc. 

```sh 
ufw allow 8081/tcp
```

#### The telegram bot itself

In the main project folder execute the following command to start the CULT NLP Server serving via port 8081    
```sh
pm2 start src/cult-telegram-bot.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-env --allow-net --allow-write"
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
