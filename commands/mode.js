const {serverCheck} = require('../utils/servercheck')

module.exports = {
	name: 'mode',
	description: 'check or choose to have listen.moe stream jpop or kpop',
    syntax: '!mode or !mode jpop/kpop',
	async execute(message, args, ops) {
        if(args.length === 0){
            const server = await serverCheck(message.guild.id);
            message.channel.send(`Currently playing ${server.mode}`);
            return;
        }
        if(args.length !== 1){
            message.channel.send('!mode jpop or kpop');
            return;
        }
        if(!ops.modes[args[0]]){
            message.channel.send('Please choose between jpop or kpop');
            return;
        }
        const server = await serverCheck(message.guild.id);
        if(server.mode === args[0]){
            message.channel.send(`Already playing ${server.mode}`);
            return;
        }
        server.mode = args[0];
        if(ops.dispatcher[message.guild.id]){
            ops.dispatcher[message.guild.id] = ops.dispatcher[message.guild.id].player.voiceConnection.play(ops.modes[server.mode].stream ,{volume: 0.2})
        }
        await server.save();
        message.channel.send(`Switched to ${args[0]}!`);
	},
};