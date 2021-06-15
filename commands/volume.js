const {serverCheck} = require('../utils/servercheck')

module.exports = {
	name: 'volume',
	description: 'checks or sets the listen.moe bot\'s volume',
    syntax: '!volume or !volume 0-100',
	async execute(message, args, ops) {
		if (message.member.voice.channel) {
            const server = await serverCheck(message.guild.id);
            if(!args.length){
                message.channel.send(`Current volume is: ${server.volume * 100}%`);
                return
            }
            if(args.length !== 1){
                message.channel.send('Choose a value from 0 to 100');
                return;
            }
            const volume = parseInt(args[0]);
            if(volume === NaN || volume === undefined || volume < 0 || volume > 100){
                message.channel.send('Choose a value from 0 to 100');
                return;
            }
            server.volume = volume / 100;
            if(ops.dispatcher[message.guild.id]){
                message.member.voice.channel.join();
                ops.dispatcher[message.guild.id].setVolume(server.volume);
			}
            // message.channel.send(`Volume updated to ${server.volume * 100}%`);
            message.react(':HuTao_Cute:854185648301539338');
            await server.save();
        } else {
            message.reply('You need to join a voice channel first!');
        }
	},
};