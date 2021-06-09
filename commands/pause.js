module.exports = {
	name: 'pause',
	description: 'pauses music for listen.moe bot',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
            ops.dispatcher.pause(true);
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};