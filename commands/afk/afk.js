const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class AFKCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'afk',
			group: 'afk',
			memberName: 'afk',
			description: 'You become AFK for whatever reason. Can be used by anyone.',
      args: [
        {
          key: 'reason',
          prompt: 'Why do you want to be afk?',
          type: 'string',
        }
      ]
		});
	}

	async run(message, { reason }) {
		if(message.author.id === message.guild.owner.id) {
			return message.channel.send("Sorry but the owner cannot use this command.");
		}

    const afk = db.get(`afk_${message.guild.id}_${message.author.id}`)

    if(afk === null) {
      db.set(`afk_${message.guild.id}_${message.author.id}`, 1)
      message.channel.send(message.author.tag + ` is now AFK for ${reason}!`)
      await message.member.setNickname(`AFK: ${message.author.username}`);
    }

    if(afk === 1) {
      message.channel.send('You are already AFK!')
    }
  }
};
