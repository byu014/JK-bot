module.exports = {
	name: 'leave',
	description: 'kick listen.moe bot from current channel',
	execute(message, args, ops) {
		message.member.voice.channel.leave();
        ops.dispatcher = null;
        message.channel.send('Leaving VC');
	},
};