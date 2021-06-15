const User = require('../models/user');
let axios = require('axios');
const {data} = require('../APIrequests/favorite');
const Discord = require('discord.js');
const { serverCheck } = require('../utils/servercheck');
const favoritesData = require('../APIrequests/checkfavorites').data;
const { userCheck } = require('../utils/usercheck');
module.exports = {
	name: 'favorite',
	description: 'add current song or specified song\'s ID to favorites',
    syntax: '!favorite or !favorite songID',
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
            
            if(username === null){
                message.channel.send('You need to be logged in to use this feature');
                return;
            }
            favoritesData.variables = {
                "username": username,
                "offset": 0,
                "count": 100
            }
            data.variables = {
                "id": args.length ? parseInt(args[0]) : ops.currentSong[server.mode].id,
            };
            const {headers} = ops;
            headers.Authorization = `Bearer ${token}`;
            let alreadyFavorited = false;

            axios.post('https://listen.moe/graphql', favoritesData, {headers})
                .then(res => {
                    const favorites = res.data.data.user.favorites.favorites
                    for(let favorite of favorites){
                        if(favorite.song.id === data.variables.id){
                            message.channel.send('Already in favorites. To remove from favorites list, use: !unfavorite songID');
                            alreadyFavorited = true;
                            return;
                        }
                    }
                })
                .then(() => {
                    if(!alreadyFavorited){
                        axios.post('https://listen.moe/graphql', data, {headers})
                            .then(res => {
                                if(res.data.errors){
                                    message.channel.send('Song does not exist');
                                    return;
                                }
                                message.channel.send('Current song successfully added to your favorites list!');
                            })
                    }
                })
        }
        catch(error){
            console.log(error.response.status, error.response.statusText);
        }
	},
};