
const { Command } = require('discord.js-commando');

module.exports = class DmCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'fun',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
	    guildOnly: true,
	    args: [
              {
	      	key: 'user',
		prompt: 'Who do you want to DM?',
		type: 'member'
              },
	      {     
                key: 'content',
                prompt: 'What do you want to send?',
                type: 'string'
              },
	   ],
	});
    }

    run(message, { user, content }) {
        user.send(content + ` - ${message.author}`);
	message.channel.send(`Sent message to ${user} containing: ${content}.`);
    }
};
