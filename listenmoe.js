if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const Discord = require('discord.js');
const axios = require('axios');
const OpusScript = require("opusscript");
const fs = require('fs');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const {connectjpop, connectkpop, connectws} = require('./websocket');
const { sub } = require('ffmpeg-static');
const { serverCheck } = require('./utils/servercheck');

// const wssjpop = new WebSocket.Server({port: 8082});
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/listenmoe';
// const { OpusEncoder } = require('@discordjs/opus');
// const encoder = new OpusEncoder(48000, 2);

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

mongoose.connect(dbUrl ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('DB connected');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
const token = process.env.DISCORD_TOKEN;
const prefix = '!';
let ops = {
    dispatcher: {},
    currentSong: {
        jpop: null,
        kpop: null,
    },
    modes:{
        jpop:{
            stream: 'https://listen.moe/stream',
            wss: 'wss://listen.moe/gateway_v2'
        },
        kpop:{
            stream: 'https://listen.moe/kpop/stream',
            wss: 'wss://listen.moe/kpop/gateway_v2'
        }
    },
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    }
};

// connectjpop(ops);
// connectkpop(ops);
connectws(ops);

client.login(token);

client.once('ready', () => {
	ops.client = client;
});

client.on('message', async (message,channelID) => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    // !message.guild
    if ( message.content[0] !== prefix || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)){
        message.reply('Command does not exist')
        return;
    } 
    
    try {
		await client.commands.get(command).execute(message, args, ops);
	} catch (error) {
		console.error(error);
		message.reply(error.response.statusText);
	}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    // check for bot
    console.log(newState.channel=== null)
    if (oldState.member.user.bot){
        if(oldState.channel === undefined && newState.channel !== undefined) {

            // User Joins a voice channel

         } else if(newState.channel === null){
           // new state isnt a voice channel
           delete ops.dispatcher[newState.guild.id];
         }
    }

    // the rest of your code
});
