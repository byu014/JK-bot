const User = require('../models/user');
let axios = require('axios');
const {data} = require('../APIrequests/login');
const {userCheck} = require('../utils/usercheck')

module.exports = {
	name: 'login',
	description: 'login to listen.moe. NOTE: only use in DM with listen.moe bot',
    syntax: '!login username password',
	async execute(message, args, ops) {
        if(message.channel.type !== 'dm'){
            message.channel.send("DM listen.moe bot the following to login: !login username password");
            message.delete();
            return;
        }
        if(args.length !== 2){
            message.channel.send('syntax: !login username password');
            // message.delete();
            return;
        }

		try{
            data.variables = {username: args[0], password: args[1]};
            const {headers} = ops;
            const res = await axios.post('https://listen.moe/graphql', data, {headers})
                .then(async res => {
                    if(res.data.errors){
                        message.channel.send(`${res.data.errors[0].message}`); 
                        // message.delete();
                    }
                    else{
                        // await User.deleteMany();
                        const currentUser = await userCheck(message.author.id);
                        currentUser.token = res.data.data.login.token;
                        currentUser.username = res.data.data.login.user.displayName;
                        await currentUser.save();
                        console.log(currentUser);
                        message.channel.send(`Sucessfully logged in as ${res.data.data.login.user.displayName}! Please delete your previous message as it contains sensitive information`);
                        // message.delete();
                    }
                })
        }
        catch(error){
            console.log(error.response.status, error.response.statusText);
            message.channel.send(`${error.errors[0].message}`); 
        }
	},
};