const Discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`;
    const userurl = message.author.avatarURL;
    let sicon = message.guild.iconURL;
    message.delete().catch(O_o=>{});
    
    if(message.channel.guild.emojis.size == 0) {
        var emote = "Aucune émoji :cold_sweat:"
    } else {
        if(message.channel.guild.emojis.size <= 10) {
            var emote = `${message.guild.emojis.map(e => e).join(' ')}`
        } else {
            var emote = "Plus de 10"
        }
    }

    if(!message.guild.afkChannel) {
        var afk_channel = "Aucun";
    } else {
        var afk_channel = `${message.guild.afkChannel}`;
    }

    let server_create_old = moment.utc(message.guild.createdAt);
    var timezome = moment.duration(2, 'h');
    let server_create = server_create_old.add(timezome).format('DD/MM/YYYY HH:mm:ss')

    const embed = new Discord.RichEmbed()
		.setColor('#3333cc')
        .setAuthor('~ Informations du serveur ~', sicon)
        .addField('ID :', `${message.guild.id}`, true)
        .addField('Nom :', `${message.guild.name}`, true)
        .addField('Créé le :', server_create , true)
        .addField('Créateur :', `<@!${message.guild.owner.id}>`, true)
        .addField('Channel :', `**${message.guild.channels.filter(channel => channel.type === 'text').size}** Écrit - **${message.guild.channels.filter(channel => channel.type === 'voice').size}** Vocal`, true)
        .addField('Channel AFK :', `${afk_channel}`, true)
        .addField(`Roles :`, `${message.channel.guild.roles.size}`, true)
        .addField(`Emojies - **${message.channel.guild.emojis.size}** :`, `${emote}`, true)
        .addField('\u200B', '\u200B', true)
        .addField('Membres :', `${message.guild.memberCount}`, true)
        .addField('Derniers membres :', `${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>\n`).splice(0, 5)}`, true)
        .addField('Status des membres', `**${message.guild.members.filter(o => o.presence.status === 'online').size}** En ligne\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Inactif\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ne pas déranger\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Déconnecté/Invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`, true)
        .setFooter(useruser, userurl)
        .setTimestamp()
         
    message.channel.send(embed)
    
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};
  
module.exports.help = {
    name: 'serveur',
    description: 'Affiche les informations du serveu.',
    usage: 'serveur',
    perm: "▫"
};