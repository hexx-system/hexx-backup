// USING API
const { Command } = require('discord.js-commando');
var giveMeAJoke = require('give-me-a-joke');
const Discord = require("discord.js");

module.exports = class JokeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			group: 'fun',
			memberName: 'joke',
			description: 'Gives you a random joke.',
		});
	}

	run(message) {
    giveMeAJoke.getRandomDadJoke(function(joke){
       message.channel.send(`${joke}`) 
    })
  }
};
