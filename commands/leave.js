module.exports = {
	name: 'leave',
	description: 'kick listen.moe bot from current channel',
	execute(message, args, ops) {
		if(message.member.voice.channel){
			message.member.voice.channel.leave();
			if(ops.dispatcher[message.guild.id]){
				delete ops.dispatcher[message.guild.id]; 
			}
		}
	},
};