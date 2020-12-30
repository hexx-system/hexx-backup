const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var money = require('discord-money');

module.exports = class BalanceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'balance',
			group: 'economy',
			memberName: 'balance',
			description: 'Gives you your balance.',
      args: [
        {
          key: 'user',
          prompt: 'Who\'s balance do you want to see?',
          type: 'member',
        }
      ]
		});
	}
  
  run(message, { user }) {
    money.fetchBal(user.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
      message.channel.send(`**Balance:** ${i.money}`);
    })
  }
};
