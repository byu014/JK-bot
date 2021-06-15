const { serverCheck } = require("../utils/servercheck");

module.exports = {
	name: 'pause',
	description: 'pauses music for listen.moe bot',
	syntax: '!pause',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
			if(ops.dispatcher[message.guild.id]){
				message.member.voice.channel.join();
				ops.dispatcher[message.guild.id].pause(true);
				message.react(':HuTao_Sus:854177109349498911')
			}
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};