//NOT MINE
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class WarnCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      group: "admin",
      examples: ["warn <@mention> <reason>"],
      description: "Warn anyone who do not obey the rules",
      memberName: "warn",
      userPermissions: ['ADMINISTRATOR'],
    });
  }
  async run (message) {
    const prefix = "h!"

    const args = message.content.slice(prefix.length).trim().split(' ');

    const user = message.mentions.members.first()

    if(!user) {
      return message.channel.send("Please mention the person to who you want to warn. - warn @mention <reason>")
    }

    if(message.mentions.users.first().bot) {
      return message.channel.send("You can not warn bots.")
    }

    if(message.author.id === user.id) {
      return message.channel.send("You can not warn yourself.")
    }

    if(user.id === message.guild.owner.id) {
      return message.channel.send("There is no possible way to warn the owner of the server.")
    }

    const reason = args.slice(2).join(" ")

    if(!reason) {
      return message.channel.send("Please provide reason to warn - warn @mention <reason>")
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    if(warnings === 3) {
      return message.channel.send(`${message.mentions.members.first().username} already reached his/her limit with 3 warnings! You should consider kicking them.`)
    }

    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}.`)
      await message.channel.send(`Warned ${message.mentions.users.first().username} for the first time for ${reason}!`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}.`)
      await message.channel.send(`Warned ${message.mentions.users.first().username} ${warnings} time for ${reason}.`)
    }


  }
}
