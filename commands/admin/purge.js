//NOT MINE
const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'admin',
			memberName: 'purge',
			description: 'Purges up to 100 messages. Note: Messages cannot be older than 14 days.',
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	async run(msg) {
    const args = msg.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    const amount = args.join(' '); // Amount of messages which should be deleted

    if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

    if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

    await msg.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
        msg.channel.bulkDelete(messages)
        msg.channel.send(`Successfully deleted ${amount} messages!`)
    });
  }
}
