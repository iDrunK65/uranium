const Discord = require("discord.js");

const config = require("../config.json")

exports.run = (client, message, args) => {
    const aide = `ℹ <@!${message.author.id}> > Tu dois mettre le nom de la **commande** que tu veut rechargé ! ℹ`;
    const cmd_introuvable = `<:nonvalide:526332150224650240> <@!${message.author.id}> > Cette commande existe pas ! <:nonvalide:526332150224650240>`;
    const log_introuvable = `<:nonvalide:526332150224650240> <@!${message.author.id}> > Je ne trouve pas le channel de log ! <:nonvalide:526332150224650240>\nMerci de contacter ${config.author} !`
    const refusé = `<:nonvalide:526332150224650240> <@!${message.author.id}> > Tu peux pas faire ça !<:nonvalide:526332150224650240>\nSeulement __**${config.author}**__ peut faire ça.`;
    const cmd_reload = `<:valide:526332149993832449> <@!${message.author.id}> > La commande **${commandName}** a été rechargé ! <:valide:526332149993832449>`;
    let log_actions_channel = client.channels.get(config.log_actions);


    message.delete().catch(O_o=>{});
    if(message.author.id == config.authorid) {
        if(args[0] === "-help" || !args[0]){
            message.delete().catch(O_o=>{});

            let reloadaide = new Discord.RichEmbed()
                .setTitle("~ Action accepté ~") 
                .setColor("#43b581")
                .addField("Pseudo", `${message.author}`,true)
                .addField("Commande", `${config.prefix}reload`, true)
                .addField("Serveur", `${message.guild.name}`,true)
                .addField("Réponse du Bot", aide)
                .setTimestamp();
                
            if(!log_actions_channel) {
                return message.channel.send(`${log_introuvable}(Error : 1)`).then(msg => {msg.delete(10000)});
            } else {
                log_actions_channel.send(reloadaide);
                message.channel.send(aide).then(msg => {msg.delete(10000)}); 
            }
        } else {
            const commandName = args[0];
            if(!client.commands.has(commandName)) {

                let reloadcmdintrouvable = new Discord.RichEmbed()
                    .setTitle("~ Action accepté ~") 
                    .setColor("#43b581")
                    .addField("Pseudo", `${message.author}`,true)
                    .addField("Commande", `${config.prefix}reload ${args[0]}`, true)
                    .addField("Serveur", `${message.guild.name}`,true)
                    .addField("Réponse du Bot", cmd_introuvable)
                    .setTimestamp();
                    
                if(!log_actions_channel) {
                    message.channel.send(`${log_introuvable}(Error : 2)`).then(msg => {msg.delete(10000)});
                } else {
                    log_actions_channel.send(reloadcmdintrouvable);
                    message.channel.send(cmd_introuvable).then(msg => {msg.delete(5000)});
                }
            }

            delete require.cache[require.resolve(`./${commandName}.js`)];
        
            client.commands.delete(commandName);
            const props = require(`./${commandName}.js`);
            client.commands.set(commandName, props);

            message.delete().catch(O_o=>{});
            console.log(`[RELOAD] ${message.author.username}#${message.author.discriminator} à rechagé la commande ${commandName} !`);

            let reloadcmdvalide= new Discord.RichEmbed()
                    .setTitle("~ Action accepté ~") 
                    .setColor("#43b581")
                    .addField("Pseudo", `${message.author}`,true)
                    .addField("Commande", `${config.prefix}reload ${args[0]}`, true)
                    .addField("Serveur", `${message.guild.name}`,true)
                    .addField("Réponse du Bot", cmd_reload)
                    .setTimestamp();
                    
                if(!log_actions_channel) {
                    message.channel.send(`${log_introuvable}(Error : 3)`).then(msg => {msg.delete(10000)});
                } else {
                    log_actions_channel.send(reloadcmdvalide);
                    message.channel.send(cmd_reload).then(msg => {msg.delete(5000)});
                }
        }

    } else {
        message.delete().catch(O_o=>{});

        let reloadrefusé = new Discord.RichEmbed()
            .setTitle("~ Action refusé ~") 
            .setColor("#f04747")
            .addField("Pseudo", `${message.author}`,true)
            .addField("Commande", `${config.prefix}reload`, true)
            .addField("Serveur", `${message.guild.name}`,true)
            .addField("Réponse du Bot", refusé)
            .setTimestamp();
            
        if(!log_actions_channel) {
            message.channel.send(`${log_introuvable}(Error : 4)`).then(msg => {msg.delete(10000)});
        } else {
            log_actions_channel.send(reloadrefusé);
            message.channel.send(refusé).then(msg => {msg.delete(5000)});
        }
    }
    
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};

module.exports.help = {
    name: 'reload',
    description: 'Affiche toutes les informations du bot.',
    usage: 'reload',
    perm: "🔹"
};