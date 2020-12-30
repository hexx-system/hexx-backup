//NOT MINE
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class ResetWarnsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "resetwarns",
      aliases: ["rwarns"],
      group: "admin",
      examples: ["rwarns <@user>", "resetwarns <@user>"],
      description: "Reset warnings of mentioned person",
      memberName: "resetwarns",
      userPermissions: ['ADMINISTRATOR']
  });
}
  async run (message, args) {
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("Please mention the person whose warning you want to reset.")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Bot are not allowed to have warnings.")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You are not allowed to reset your warnings.")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} do not have any warnings.`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Your all warnings are reset by ${message.author.username} from ${message.guild.name}.`)
    await message.channel.send(`Reset all warnings of ${message.mentions.users.first().username}.`)
    
  
    
}
}
