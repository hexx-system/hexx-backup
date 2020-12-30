// NOT MINE
const { Command } = require('discord.js-commando');
const db = require('quick.db')

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kicks a member/bot. Note: Bot role needs to be higher than the member/bot.',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
		});
	}

	run(message) {
message.channel.send("Hexx merged with The Dev Community! Do h!invite and h!inviteserver to see the server and bot invites!");
		const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('They were bad or it was a test!')
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}!`);
          })
          .catch(err => {
            message.reply('I was unable to kick the member.');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
};
