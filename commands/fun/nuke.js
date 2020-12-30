const { Command } = require('discord.js-commando');

module.exports = class NukeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nuke',
			group: 'fun',
			memberName: 'nuke',
			description: 'Nukes people!',
      args: [
          {
			      key: 'user',
			      prompt: 'Who would you like to nuke?',
			      type: 'member',
		    },
      ]
		});
	}

	run(message, { user }) {
    message.reply(`Nuked ${user}!`);
    message.channel.send(`${user}, you have been nuked by ${message.author}.`, { files: ["https://media.giphy.com/media/XrNry0aqYWEhi/giphy.gif"] });
  }
};
