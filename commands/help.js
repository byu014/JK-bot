module.exports = {
	name: 'help',
	description: 'help page',
    syntax: '!help',
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