const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'misc',
            memberName: 'invite',
            description: 'Sends bot invite.',
        });
    }

    run(message, args) {
      message.channel.send(`Link: https://discord.com/api/oauth2/authorize?client_id=754809998789443605&permissions=8&scope=bot`)
      message.channel.send('Imbroglio Invite: https://discord.com/oauth2/authorize?client_id=782280648735195136&scope=bot&permissions=8')
      message.channel.send('Unagi Invite: https://discord.com/oauth2/authorize?client_id=780428669934895134&scope=bot&permissions=8')
      message.channel.send("Use it to invite this bot and our friend's  bots!")
    }
};
