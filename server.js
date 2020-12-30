require('dotenv').config();
const { CommandoClient } = require('discord.js-commando');
const Canvas = require('canvas');
const Discord  = require('discord.js');
const path = require('path');
const token = process.env.TOKEN;
const { DBLAPI } = require('@openbots/servercountapi');
const money = require("discord-money");
const fs = require('fs');
const auth_token = "BuOIfLMpMaWNia5kfN4e";
const express = require('express');
const app = express();

Discord.Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        loopQueue: false,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});


app.get('/stats.json', function(req, res) {
  res.sendFile(path.join(__dirname + '/stats.json'));
});

const client = new CommandoClient({
  commandPrefix: 'h!',
  unknownCommandResponse: false,
  owner: ['678941697488584734', '684519096788058145', '740351168743604246', '760911098106216500'],
  disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'Admin-Only Commands'],
        ['misc', 'Miscellaneous Commands'],
        ['fun', 'Fun Commands'],
        ['economy', 'Money Commands'],
        ['afk', 'AFK Commands'],
	['music', 'Music commands provided by Galnir'],
	['utility', 'Utility Commands']
   ])
    .registerDefaultGroups({
	utility: false,
    })
    .registerDefaultCommands({
	help: false,
	prefix: false,
	ping: false,
	eval: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`Logged in to ${client.user.tag}!`);
    client.user.setActivity(`with ${client.guilds.cache.size} servers!`, { type: "WATCHING" });
    DBLAPI({
      client: client,
      authorization: auth_token
    })

    var apiText = { servers: `${client.guilds.cache.size}`, channels: `${client.channels.cache.size}` };
    var apiJSON = JSON.stringify(apiText);
    fs.appendFile('stats.json', apiJSON, function(err) {
      if (err) throw err;
      console.log('Updated!');
    });
    app.listen(process.env.PORT);
    Canvas.registerFont('./resources/welcome/OpenSans-Light.ttf', { family: 'Open Sans Light' });
   });

const db = require("quick.db") //using quick.db package

client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});

client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`serving ${client.guilds.cache.size} servers.`);
});

client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`serving ${client.guilds.cache.size} servers.`);
});

client.on("guildMemberAdd", async (member) => { //usage of welcome event
  let rle = db.get(`role_${member.guild.id}`);
  let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(rle === null) {
   rle === null
  }
  
  if(chx === null) { //check if var have value or not
    return;
  }
  
  if(!rle === null) {
   if(!member.guild.pending) {
     member.addRole(rle)
   } else if (member.guild.pending) {
     setTimeout(function(){
      member.addRole(rle)
     }, 15000);
  }
  
  const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      let fontSize = 70;

      do {
        ctx.font = `${(fontSize -= 10)}px Open Sans Light`; // if the font register changed this needs to match the family Name on line 62
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };
    // Custom Welcome Image for new members
    const canvas = Canvas.createCanvas(700, 250); // Set the dimensions (Width, Height)
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(
      './resources/welcome/wallpaper.jpg' // can add what ever image you want for the Background just make sure that the filename matches
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000000'; // the color of the trim on the outside of the welcome image
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '26px Open Sans Light'; // if the font register changed this needs to match the family Name on line 62
    ctx.fillStyle = '#FFFFFF'; // Main Color of the Text on the top of the welcome image
    ctx.fillText(
      `Welcome to ${member.guild.name}`,
      canvas.width / 2.5,
      canvas.height / 3.5
    );
    ctx.strokeStyle = `#FFFFFF`; // Secondary Color of Text on the top of welcome for depth/shadow the stroke is under the main color
    ctx.strokeText(
      `Welcome to ${member.guild.name}`,
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#FFFFFF'; // Main Color for the members name for the welcome image
    ctx.fillText(
      `${member.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );
    ctx.strokeStyle = `#FF0000`; // Secondary Color for the member name to add depth/shadow to the text
    ctx.strokeText(
      `${member.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: 'jpg' })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      'welcome-image.png'
    );

    var embed = new Discord.MessageEmbed()
      .setTitle(
     `Hey ${member.displayName}, Welcome to ${member.guild.name}!`
      )
      .setColor(`RANDOM`)
      .attachFiles(attachment)
      .setImage('attachment://welcome-image.png')
      .setFooter(`Type h!help for a feature list!`)
      .setTimestamp();

      client.channels.cache.get(chx).send(embed);
}
});

client.on("guildMemberRemove", (member) => {
  let chx = db.get(`leavechannel_${member.guild.id}`);

  if(chx === null) {
    return;
  }

  let lembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#ff2050")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`${member} just left, how sad.`);

  client.channels.cache.get(chx).send(lembed)
})



client.login(token);
