const { serverCheck } = require("../utils/servercheck");

module.exports = {
	name: 'play',
	description: 'plays/resumes music from listen.moe',
	syntax: '!play',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			
			if(!ops.dispatcher[message.guild.id]){
				const server = await serverCheck(message.guild.id);
				const audioLink = ops.modes[server.mode].stream;
				const dispatcher = connection.play(audioLink ,{volume: server.volume});
				await connection.voice.setSelfDeaf(true);
				ops.dispatcher[message.guild.id] = dispatcher;
			}
			else{
				ops.dispatcher[message.guild.id].resume();
			}
        } 
		else {
            message.reply('You need to join a voice channel first!');
        }
	},
};