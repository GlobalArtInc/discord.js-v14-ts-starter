# Discord v14 Typescript Starter

# Deprecated
**The current bot structure is deprecated. In my opinion, the current implementations by many developers are a complete mess. I recommend using a framework; the best option is [NestJS](https://nestjs.com) and the [NestCord](https://github.com/GlobalArtInc/nestcord) module.**

A quick-start template for Discord.js v14 in Typescript that contains handling for commands, events, and interactions!

# Installation
1) Clone the project with git clone `git@github.com:GlobalArtInc/discord/js-v14-ts-starter.git`
2) Rename .env.sample to .env and configure it
3) Start the bot in development mode `npm run start:dev`

# Building
1) Build the bot `npm run build`
2) Start the bot `npm run start`

You can deploy it to docker or kubernetes. 

[Read the little guide](https://www.vultr.com/docs/how-to-run-a-discord-js-bot-on-a-docker-application/)

# Todo
1) Deployment to kubernetes using Werf

# References
1) [Discord.JS Docs](https://discord.js.org)
2) [TypeORM](https://typeorm.io)
3) [Werf](https://werf.io)
4) [The twelve-factor app](https://12factor.net)