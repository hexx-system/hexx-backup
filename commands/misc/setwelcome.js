const Discord = require("discord.js")
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class SetWelcomeCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'setwelcome',
          group: 'misc',
          memberName: 'setwelcome',
          description: 'Sets the welcome channel. ADMINISTRATOR ONLY',
          userPermissions: ['ADMINISTRATOR']
        });
    }
              
run(message) {
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please mention the channel first.")
    }
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is set as ${channel}.`)
  }
}
