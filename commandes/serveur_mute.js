const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let log_actions_channel = client.channels.get(config.log_actions);

    message.delete().catch(O_o=>{});
    if(message.author.id == config.authorid) {

        let commande = args.shift();
        let MUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args.shift()));
        if(!MUser) return message.channel.send("Je ne trouve pas l'utilisateur.");

        if(!MUser.serverMute && !MUser.serverDeaf) {
            MUser.setMute(true, `Mute par ${message.author.tag}`)
            MUser.setDeaf(true)
        } else {
            MUser.setMute(false, `Démute par ${message.author.tag}`)
            MUser.setDeaf(false, `Démute`)
        }
    } else {
        let smrefusé = new Discord.RichEmbed()
            .setTitle("~ Action refusé ~") 
            .setColor("#f04747")
            .addField("Pseudo", `${message.author}`,true)
            .addField("Commande", `${config.prefix}sm`, true)
            .addField("Serveur", `${message.guild.name}`,true)
            .addField("Réponse du Bot", `${config.action_owner}`)
            .setTimestamp();
            
        if(!log_actions_channel) {
            message.channel.send(`${log_introuvable}(Error : 4)`).then(msg => {msg.delete(10000)});
        } else {
            log_actions_channel.send(smrefusé);
            message.channel.send(refusé).then(msg => {msg.delete(5000)});
        }
    }
}

module.exports.help = {
    name: 'serveur_mute',
    description: '',
    usage: 'serveur_mute [pseudo]',
};