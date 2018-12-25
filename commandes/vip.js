const Discord = require("discord.js");
const config = require("../config.json");


module.exports.run = async (client, message, args) => {
    let log_actions_channel = client.channels.get(config.log_actions);

    message.delete().catch(O_o=>{});
    if(message.author.id == config.authorid) {

        let commande = args.shift();
        let VIProle = message.guild.roles.find(role => role.name === config.role_vip);
        let VUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args.shift()));
        if(!VUser) return message.channel.send("Je ne trouve pas l'utilisateur.");

            VUser.addRole(VIProle).catch(console.error);
    } else {
        let smrefusé = new Discord.RichEmbed()
            .setTitle("~ Action refusé ~") 
            .setColor("#f04747")
            .addField("Pseudo", `${message.author}`,true)
            .addField("Commande", `${config.prefix}VIP`, true)
            .addField("Serveur", `${message.guild.name}`,true)
            .addField("Réponse du Bot", refusé)
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
    name: 'vip',
    description: '',
    usage: 'vip [pseudo]',
};