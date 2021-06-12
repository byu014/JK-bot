const { serverCheck } = require("../utils/servercheck");

module.exports = {
	name: 'pause',
	description: 'pauses music for listen.moe bot',
	syntax: '!pause',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
			message.member.voice.channel.join();
			const server = await serverCheck(message.guild.id)
			if(ops.dispatcher[message.guild.id]){
				ops.dispatcher[message.guild.id].pause(true);
			}
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};