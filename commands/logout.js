const User = require('../models/user');
const {userCheck} = require('../utils/usercheck')

module.exports = {
	name: 'logout',
	description: 'logout of current listen.moe account',
    syntax: '!logout',
	async execute(message, args, ops) {
        const user = await userCheck(message.author.id);
        if(user.token){
            user.token = null;
            user.username = null;
            await user.save();
            message.channel.send('Successfully logged out');
        }
        else{
            message.channel.send('Currently not signed in to any account');
        }
	},
};