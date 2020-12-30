const Discord = require("discord.js")
const db = require("quick.db")
const { Command } = require('discord.js-commando');

module.exports = class SetAutoRoleCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'setautorole',
          group: 'misc',
          memberName: 'setautorole',
          description: 'Sets a new auto role! ADMINISTRATOR ONLY',
          userPermissions: ['ADMINISTRATOR']
        });
    }
              
run(message) {
    let role = message.mentions.roles.first()
    
    if(!role) {
      return message.channel.send("Please mention the role first.")
    }
    
    db.set(`role_${member.guild.id}`, role.id)
    
    message.channel.send(`Auto Role is set to ${role}.`)
  }
}
