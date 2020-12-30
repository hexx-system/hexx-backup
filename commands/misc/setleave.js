
const Discord = require("discord.js")
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class SetLeaveCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'setleave',
          group: 'misc',
          memberName: 'setleave',
          description: 'Sets the leave channel. ADMINISTRATOR ONLY',
          userPermissions: ['ADMINISTRATOR']
        });
    }
              
run(message) {
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please mention the channel first.")
    }
    
    db.set(`leavechannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Leave Channel is set as ${channel}.`)
  }
}
