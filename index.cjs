const dotenv = require('dotenv');
const { ShardingManager } = require('discord.js');
dotenv.config();

const manager = new ShardingManager('./bot.cjs', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();