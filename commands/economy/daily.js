const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var money = require('discord-money');
const moment = require('moment');

module.exports = class DailyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'daily',
			group: 'economy',
			memberName: 'daily',
			description: 'Gives you 100 point daily.',
		});
	}
  
  run(message) {
    if (money[message.author.username + message.guild.name] != moment().format('L')) {
       money[message.author.username + message.guild.name] = moment().format('L')
      money.updateBal(message.author.id, 100).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, the  can't get it back again.
      message.channel.send({embed: {
        color: 3447003,
        description: 'Recieved your **$100** \`h!daily`\. Maybe you should check \`h!balance\`.',
        author: {
          name: `${message.author.username}#${message.author.discriminator}`,
          icon_url: message.author.avatarURL 
        }
      }});
    })
   } else {
      message.channel.send({embed: {
        color: 3447003,
        description: 'You already recieved your \`h!daily`\. Check later **' + moment().endOf('day').fromNow() + '**.', // When you got your daily already, this message will show up.
        author: {
          name: `${message.author.username}#${message.author.discriminator}`,
          icon_url: message.author.avatarURL 
       }
    }});
    }
  }
};
