const { Command } = require('discord.js-commando');
const TicTacToe = require('discord-tictactoe');

module.exports = class TicStartCommand extends Command {
	constructor(client) {
		super(client, {
      name: 'tic-start',
      group: 'fun',
      memberName: 'tic-start',
      description: 'Plays Tic Tac Toe with you!',
      args: [
        {
          key: "code",
          prompt: "What language **code** would you like the game to be on?",
          type: "string"
        }
      ]
    });
  }
        
  run(message, { code }) {
    message.channel.send('To run the game, do **h!tic-tac-toe**!')
    const client = message.client;
    
    new TicTacToe({
      language: code,
      command: 'h!tic-tac-toe'
    }, client);
  }
};
