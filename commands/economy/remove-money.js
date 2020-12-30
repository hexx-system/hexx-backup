const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var money = require('discord-money');

module.exports = class RemoveMoneyCommand extends Command {
        constructor(client) {
                super(client, {
                        name: 'remove-money',
                        group: 'economy',
                        memberName: 'remove-money',
                        description: 'Removes the amount of money chosen.',
      args: [
        {
          key: 'wanted',
          prompt: 'How much money do you want to remove to your balance?',
          type: 'integer',
        }
      ]
                });
        }
  
  run(message, { wanted }) {
    money.updateBal(message.author.id, -wanted).then((i) => {
      message.channel.send({embed: {
        color: 3447003,
        description: `Removed **$${wanted}.** You should check \`h!balance\`.`,
        author: {
          name: `${message.author.username}#${message.author.discriminator}`,
          icon_url: message.author.avatarURL 
        }
      }});
    })
  }
}
