if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const Discord = require('discord.js');
const axios = require('axios');
const OpusScript = require("opusscript");
const fs = require('fs');
const mongoose = require('mongoose');
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
const active = new Map();
const prefix = '!';
let ops = {
    dispatcher: null,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    }
};

client.login(token);

const dispatcher = 
client.once('ready', () => {
	
});

client.on('message', async message => {
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

