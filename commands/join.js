const { serverCheck } = require("../utils/servercheck");

module.exports = {
	name: 'join',
	description: 'invites listen.moe bot to join current voice channel',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
            const server = await serverCheck(message.guild.id);
            const audioLink = ops.modes[server.mode].stream;
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(audioLink ,{volume: 0.2})
            await connection.voice.setSelfDeaf(true);
            ops.dispatcher = dispatcher;
            message.channel.send('Joining VC');
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};