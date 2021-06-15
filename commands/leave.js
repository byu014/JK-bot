module.exports = {
	name: 'leave',
	description: 'kick listen.moe bot from current channel',
	syntax: '!leave',
	execute(message, args, ops) {
		if(message.member.voice.channel){
			if(ops.dispatcher[message.guild.id]){
				message.member.voice.channel.leave();
				delete ops.dispatcher[message.guild.id]; 
				message.react(':HuTao_Yawn:854176370842271764');
			}
		}
	},
};