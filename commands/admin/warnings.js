//NOT MINE
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class WarningsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warnings",
      description: "Get the warnings of yours or mentioned person",
      group: "admin",
      memberName: "warnings",
    });
  }
  
    run(message, args) {
      const user = message.mentions.members.first() || message.author
      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
      if(warnings === null) warnings = 0;
    
      message.channel.send(`${user} have **${warnings}** warning(s)`)
  }
}
