const Discord = require("discord.js");
const config = require("../config.json")

exports.run = (client, message) => {
  if (message.author.id === config.authorid) {
    message.delete().catch(O_o=>{});
    message.reply("Tu es mon créateur !").then(msg => {msg.delete(10000)})
  } else {
    message.delete().catch(O_o=>{});
    message.reply("T'es pas mon créateur ! ") .then(msg => {msg.delete(10000)})
  }
};

exports.help = {
    name: 'master',
    description: '?',
    usage: 'master',
    aliase: ['Aucun aliase n\'est disponible pour cette commandes.']
};