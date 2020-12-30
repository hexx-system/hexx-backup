const { Command } = require('discord.js-commando');

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            aliases: ['roll', 'dice'],
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a dice.',
            examples: ['n!roll 6'],
            args: [
              {
                key: 'value',
                prompt: 'What is the maximum number you wish to appear?',
                type: 'integer'
              }
          ]
        });    
    }

    run(msg, { value }) {
	        var min = 1; 
	        var max = value;
          var dice = Math.random() * (+max - +min) + +min;
          msg.channel.send(`Your number is ${dice}.`)
    }
};
