const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'utility',
            memberName: 'help',
            description: 'Gives out all the help commands!',
            examples: ['h!help']
        });    
    }

    run(message) {
        const embed = new MessageEmbed()
            .addField('<:New_verified:793587367473709106> Admin Only Commands','ban: Bans a member/bot. Note: Bot role needs to be higher than the member/bot.\n kick: Kicks a member/bot. Note: Bot role needs to be higher than the member/bot. \n purge: Purges up to 100 messages. Note: Messages cannot be older than 14 days.\n resetwarns: Reset warnings of mentioned person \n warn: Warn anyone who do not obey the rules \n warnings: Get the warnings of yours or mentioned person \n ', false)
            .addField('<:rainbow_indicator_question:793585929167962112> Miscellaneous Commands.','about: Shows about info of Hexx. \`command inspired by SpeckyBot\`\n invite: Sends bot invite. \n inviteserver: Sends support server invite link. \n setleave: Sets the leave channel. ADMINISTRATOR ONLY \n setwelcome: Sets the welcome channel. ADMINISTRATOR ONLY \n uptime: Shows the uptime of the bot.', false)
            .addField('<a:carrotwiggle:793585434671448104> Fun Commands!','dm: Sends a message to the user you mention. \n embed: Embeds the text you provide. \n joke: Gives you a random joke. \n meme: Gives you a random meme. \n minesweeper: Plays minesweeper. \n punch: Punches people! \n roll: Rolls a dice. \n tic-start: Plays Tic Tac Toe with you!',false)
            .addField('<:emo_money:793585247438110720> Money Commands!','add-money: Gives you as much as you want (administrator only). \n balance: Gives you your balance.\n daily: Gives you 100 point daily. \n remove-money: Removes the amount of money chosen.',false)
            .addField('<a:rainbowAFK_v2:793585141070037003> AFK Commands!','afk: You become AFK for whatever reason. Can be used by anyone.\n unafk: You stop being afk with this command. Can be used by anyone.',false)
            .addField('<:wingedmusicnote:793584987336605706> Shows music commands provided by Galnir.','lyrics: Get lyrics of any song or the lyrics of the currently playing song! \n move: Move song to a desired position in queue!',false)
            .setColor(0x00AE86)
            .setTimestamp();
        return message.channel.send(embed);
    }
};
