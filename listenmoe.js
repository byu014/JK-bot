if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const Discord = require('discord.js');
const axios = require('axios');
const OpusScript = require("opusscript");
// const { OpusEncoder } = require('@discordjs/opus');
// const encoder = new OpusEncoder(48000, 2);

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = '!';
const audioLink = 'https://listen.moe/stream';

client.login(token);

client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild || message.content[0] !== prefix) return;

    if (message.content.startsWith(`${prefix}join`)) {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.play(audioLink ,{volume: 0.2})
            await connection.voice.setSelfDeaf(true);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
    else if(message.content.startsWith(`${prefix}leave`)){
        message.member.voice.channel.leave();
    }
});