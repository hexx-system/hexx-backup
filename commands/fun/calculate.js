const { Command } = require('discord.js-commando');
const math = require('discord-math');

module.exports = class CalculateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'calculate',
			aliases: ['calc'],
			group: 'fun',
			memberName: 'calculate',
			description: 'The bot does math for you!',
			args: [
		{
			key: 'num1',
			prompt: 'Number 1?',
			type: 'integer',
		},
{
                        key: 'method',
                        prompt: 'What symbol are you using?',
                        type: 'string',
                },
{
                        key: 'num2',
                        prompt: 'Number 2?',
                        type: 'integer',
                },
	],
		});
	}

run(message, { num1, method, num2 }) {
	try {	
		message.channel.send(`Answer: ${math.calculate(num1, method, num2)}`);
	} catch (e) {
	    message.channel.send("Bad equation! Please use +, -, x, or /!");
            console.log(e);
        }
}
};


