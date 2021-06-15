const User = require('../models/user');
let axios = require('axios');
const Discord = require('discord.js');
const { serverCheck } = require('../utils/servercheck');
const {data} = require('../APIrequests/checkfavorites');
const { userCheck } = require('../utils/usercheck');
module.exports = {
	name: 'favorites',
	description: 'lists your or specified user\'s favorite songs',
    syntax: '!favorites or !favorites username',
	async execute(message, args, ops) {
		if(args.length > 1){
            message.channel.send('syntax: !favorite or !favorite songID');
            return;
        }
        try{
            const server = await serverCheck(message.guild.id);
            const user = await userCheck(message.author.id);
            const token = user.token;
            const username = user.username;
            
            if(username === null && !args.length){
                message.channel.send('You need to be logged in to view self favorites');
                return;
            }
            data.variables = {
                "username": args.length ? args[0] : username,
                "offset": 0,
                "count": 20,
                "kpop" : false,
            }

            const {headers} = ops;
            headers.Authorization = `Bearer ${token}`;
            let userExists = true;
            const embed = new Discord.MessageEmbed()
                .setColor('#FF015B')
                .setTitle(`${data.variables.username}'s Favorites`)
                .setURL(`https://listen.moe/u/${data.variables.username}/favorites`)
            let i = 1;
            axios.post('https://listen.moe/graphql', data, {headers})
                .then(res => {
                    if(!res.data.data.user){
                        message.channel.send('User does not exist');
                        userExists = false;
                        return;
                    }
                    const favorites = res.data.data.user.favorites.favorites
                    
                    for(let favorite of favorites){
                        embed.addFields(
                            { name: '\u200B', value: `${i}. ${favorite.song.titleRomaji  ? favorite.song.titleRomaji : favorite.song.title} by ${favorite.song.artists[0].nameRomaji ? favorite.song.artists[0].nameRomaji : favorite.song.artists[0].name} | songID: ${favorite.song.id}`},

                        )
                        i++;
                    }
                    
                })
                .then(() => {
                    if(!userExists){
                        return;
                    }
                    data.variables.kpop = true;
                    axios.post('https://listen.moe/graphql', data, {headers})
                        .then(res => {
                            const favorites = res.data.data.user.favorites.favorites
                            
                            for(let favorite of favorites){
                                embed.addFields(
                                    { name: '\u200B', value: `${i}. ${favorite.song.titleRomaji  ? favorite.song.titleRomaji : favorite.song.title} by ${favorite.song.artists[0].nameRomaji ? favorite.song.artists[0].nameRomaji : favorite.song.artists[0].name} | songID: ${favorite.song.id}`},

                                )
                                i++;
                            }
                            
                        })
                        .then(()=> {
                            message.channel.send(embed);
                        })    
                })
            
        }
        catch(error){
            console.log(error.response.status, error.response.statusText);
        }
	},
};