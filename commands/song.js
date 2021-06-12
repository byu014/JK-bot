const User = require('../models/user');
let axios = require('axios');
const {data} = require('../APIrequests/profile');
const Discord = require('discord.js');
const {connect} = require('../websocket');
const { serverCheck } = require('../utils/servercheck');

module.exports = {
	name: 'song',
	description: 'display current song on listen.moe',
    syntax: '!song',
	async execute(message, args, ops) {
        const server = await serverCheck(message.guild.id);
        let imagePath = 'https://listen.moe/_nuxt/img/logo-square-64.248c1f3.png';
        if(ops.currentSong[server.mode].albums.length && ops.currentSong[server.mode].albums[0].image !== null){
            imagePath = 'https://cdn.listen.moe/covers/' + ops.currentSong[server.mode].albums[0].image;
        }
        const embed = await new Discord.MessageEmbed()
            .setColor('#FF015B')
            .setTitle(`${ops.currentSong[server.mode].title}`)
            .addFields(
                { name: 'Artist', value: ops.currentSong[server.mode].artists[0].name },
                { name: 'Duration', value:`${Math.floor(ops.currentSong[server.mode].duration/60)}:${ops.currentSong[server.mode].duration % 60}` },
            )
            .setThumbnail(imagePath)
        message.channel.send(embed);	
	},
};