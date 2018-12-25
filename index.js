const Discord = require("discord.js");
const fs = require("fs");

const config = require("./config.json");
const secret = require("./secret.json")
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commandes/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  console.log(`========== Commandes activé ==========`)
  if(jsfile.length <= 0){
    console.log("Aucune commande trouvé !");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commandes/${f}`);
    console.log(`[CMD] ${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`============ Informations ============`)
  console.log(`Pseudo du BOT   => ${bot.user.tag}`)
  console.log(`Prefix actuelle => ` + config.prefix);
  console.log(`Auteur          => ${config.author}`);
  console.log(`Version         => ${config.version}`);
  console.log(``);
  console.log(`Utilisateurs    => ${bot.users.size}`);
  console.log(`Channels        => ${bot.channels.size}`);
  console.log(`Serveurs        => ${bot.guilds.size}`);
  console.log(`============ Informations ============`);

  bot.user.setStatus("online");
  bot.user.setActivity(config.prefix + `aide`);
  console.log(``)
  console.log(`        Démarage du bot terminé       `);
  console.log(``)
  console.log(`=========== Début des logs ===========`);
  console.log(``)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    if (!message.content.startsWith(config.prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
    if (message.author.id == config.authorid && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
	
});

const reactions = ["✅"];

//Settings!
const setupCMD = ">reaction"
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["✔️ Vérifié"];

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Réagissez ci-dessous pour obtenir le rôle **"${role}"** !`); //DONT CHANGE THIS
    return messages;
}

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});

bot.login(secret.token);