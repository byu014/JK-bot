const { serverCheck } = require("../utils/servercheck");

module.exports = {
	name: 'play',
	description: 'plays/resumes music from listen.moe',
	syntax: '!play',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			await connection.voice.setSelfDeaf(true);
			
			if(!ops.dispatcher[message.guild.id]){
				const server = await serverCheck(message.guild.id);
				const audioLink = ops.modes[server.mode].stream;
				const dispatcher = connection.play(audioLink ,{volume: server.volume});
				ops.dispatcher[message.guild.id] = dispatcher;
				await message.react(':HuTao_Smart:854175378927386674');
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