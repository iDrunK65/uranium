const Discord = require("discord.js");
const moment = require("moment");

const config = require("../config.json");

exports.run = async (client, message, args) => {
	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);
    message.delete().catch(O_o=>{});

    let status;
    let embcolor;
    if (user.presence.status === "online") {
        status = "En ligne"
        embcolor = "#43b581";
    }
    if (user.presence.status === "idle") {
        status = "AFK"
        embcolor = "#faa61a";
    }
    if (user.presence.status === "dnd") {
        status = "Ne pas déranger"
        embcolor = "#f04747";
    }
    if (user.presence.status === "offline") {
        status = "Déconnecté / Invisible";
        embcolor = "#747f8d";
    }
    if (user.presence.status === "streaming") {
        status = "En Stream";
        embcolor = "#593695";
    }

    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`
    const userurl = message.author.avatarURL;
    const useravatar = user.avatarURL;

    moment.locale("fr");
    let compte_create_old = moment.utc(user.createdAt);
    var timezome = moment.duration(2, 'h');
    let compte_create = compte_create_old.add(timezome).format('DD/MM/YYYY HH:mm:ss')

    let serveur_create_old = moment.utc(user.joinedAt);
    let serveur_create = serveur_create_old.add(timezome).format('DD/MM/YYYY HH:mm:ss')


    const embed = new Discord.RichEmbed()
		.setColor(embcolor)
		.setAuthor(`Profile de ${user.username}`, useravatar)
        .addField("ID:", `${user.id}`,true )
        .addField("Pseudo :", `<@!${user.id}>`, true)
        .addField("Pseudo sur le serveur :", `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`, true)
		.addField("Rejoint discord le :", `${compte_create}`, true)
        .addField("Serveur rejoint le :", `${serveur_create}`, true)
        .addField('\u200B', '\u200B', true)
        .addField("Status :", `${status}`, true)
		.addField("Jeux :", `${user.presence.game ? user.presence.game.name : 'Aucun'}`)
		.addField("Rôles :", member.roles.map(roles => `- ${roles.name}`).join('\n'))
        .setFooter(useruser, userurl)
        .setTimestamp()
    message.channel.send({embed});
    
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info', 'information'],
    permLevel: 0
};
  
module.exports.help = {
    name: 'profile',
    description: 'Affiche le profile de toi / d\'une personne.',
    usage: 'profile [pseudo]',
};