const User = require('../models/user');
let axios = require('axios');
const {data} = require('../APIrequests/profile');
const Discord = require('discord.js');
const user = require('../models/user');
const { userCheck } = require('../utils/usercheck');

module.exports = {
	name: 'profile',
	description: 'view self or profile of specified user',
    syntax: '!profile or !profile username',
	async execute(message, args, ops) {
        if(args.length > 1){
            message.channel.send('syntax: !profile username')
            return
        }
		try{
            const user = await userCheck(message.author.id);
            if(!user.token && !args.length){
                message.channel.send('Must be logged into to view self profile');
                return;
            }
            data.variables = {
                "username": args.length ? args[0] : user.username,
                "userOffset": 0,
                "userCount": 10,
                "systemOffset": 0,
                "systemCount": 20,
            };
            const {headers} = ops;
            //headers.Authorization = `Bearer ${token}`          
            axios.post('https://listen.moe/graphql', data, {headers})
                .then(res => {
                    if(res.data.data.user){
                        const {author} = message;
                        const embed = new Discord.MessageEmbed()
                        .setColor('#FF015B')
                        .setTitle(`${res.data.data.user.username}'s Profile`)
                        .setURL(`https://listen.moe/u/${res.data.data.user.username}`)
                        .addFields(
                            { name: 'Requests made', value: res.data.data.user.requests.count },
                            { name: 'Songs favorited', value: res.data.data.user.favorites.count,  },
                            { name: 'Songs uploaded', value: res.data.data.user.uploads.count,  },
                        )
                        .setThumbnail(res.data.data.user.avatarImage !== null ? `https://cdn.listen.moe/avatars/${res.data.data.user.avatarImage}` : "https://listen.moe/_nuxt/img/logo-square-64.248c1f3.png")
                        message.channel.send(embed);
                    }
                    else{
                        message.channel.send('User does not exist!');
                    }
                })
        }
        catch(error){
            console.log(error.response.status, error.response.statusText);
        }
	},
};