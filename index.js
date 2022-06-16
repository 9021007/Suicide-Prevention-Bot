const { ShardingManager } = require('discord.js');
const { token, totalshards } = require('./config.json');

const manager = new ShardingManager('./bot.js', { token: token, totalShards: totalshards });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id + 1}`));

manager.spawn();