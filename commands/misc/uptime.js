const { Command } = require('discord.js-commando');

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'misc',
            memberName: 'uptime',
            description: 'Shows the uptime of the bot.',
        });    
    }

    run(message) {
      let totalSeconds = (this.client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
      message.channel.send(`${uptime}`)
    }
};
