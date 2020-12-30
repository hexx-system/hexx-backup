const { Command } = require('discord.js-commando');

module.exports = class PunchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'punch',
			group: 'fun',
			memberName: 'punch',
			description: 'Punches people!',
      args: [
          {
			      key: 'user',
			      prompt: 'Who would you like to punch?',
			      type: 'member',
		    },
      ]
		});
	}

	run(message, { user }) {
    message.reply(`You just smacked ${user}!`)
    message.channel.send(`${user}, ${message.author} punched you.`, { files: ["https://media0.giphy.com/media/lgcaIKboeo8ZW/giphy.gif?cid=ecf05e47282ec3d5ff5b08d63d28989892905e1c459a9d18&rid=giphy.gif"] });
  }
};
