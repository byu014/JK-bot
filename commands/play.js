module.exports = {
	name: 'play',
	description: 'plays music from listen.moe',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
			if(!ops.dispatcher){
				const audioLink = 'https://listen.moe/stream'
				const connection = await message.member.voice.channel.join();
				const dispatcher = connection.play(audioLink ,{volume: 0.2});
				await connection.voice.setSelfDeaf(true);
				ops.dispatcher = dispatcher;
            	message.channel.send('Joining VC');
			}
			else{
				ops.dispatcher.resume();
			}
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};