import { ShardingManager } from 'discord.js';
import { createRequire } from 'node:module';
import 'reflect-metadata';

// import { GuildsController, RootController, ShardsController } from './controllers/index.js';
import { Manager } from './models/manager.js';
import { Logger } from './services/index.js';
import { MathUtils, ShardUtils } from './utils/index.js';

const require = createRequire(import.meta.url);
let Config = require('../config/config.json');
let Debug = require('../config/debug.json');
let Logs = require('../config/logs.json');

async function start(): Promise<void> {
  Logger.info(Logs.info.appStarted);

  // Sharding
  let shardList: number[];
  let totalShards: number;
  try {
    let recommendedShards = await ShardUtils.recommendedShardCount(
      Config.client.token,
      Config.sharding.serversPerShard
    );
    shardList = MathUtils.range(0, recommendedShards);
    totalShards = recommendedShards;
  } catch (error) {
    Logger.error(Logs.error.retrieveShards, error);
    return;
  }

  if (shardList.length === 0) {
    Logger.warn(Logs.warn.managerNoShards);
    return;
  }

  let shardManager = new ShardingManager('dist/start-bot.js', {
    token: Config.client.token,
    mode: Debug.override.shardMode.enabled ? Debug.override.shardMode.value : 'process',
    respawn: true,
    totalShards,
    shardList,
  });
  let manager = new Manager(shardManager);

  await manager.start();
}

process.on('unhandledRejection', (reason, _promise) => {
  Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch(error => {
  Logger.error(Logs.error.unspecified, error);
});
