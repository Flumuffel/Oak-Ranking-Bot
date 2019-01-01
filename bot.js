// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTI5MDgxNzgwODUxMTc5NTQ3.DwuVXw.4WFK1KWszYPU9m8n_iC3a9GzGzI";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_3B696DEF5C897C0E1B4C96959E69760563B7A58298D5F3482D4587CFECA35E1E7F7913F845E2057CCDA5A3E0F1E7A758CDC9B55FB24FABE85ACFC90B46D1483D84BC77ABFD69A2BDE4C08C7DB4AB3E4E92E33862F94D029E7BABF861CF9C3E4C2E257582F8AFD30463F179585EB3A0E607D2B2F68B7BA8F8FCF49A21617965C70F98A341E1969AE519289EB46570227B3C9B77288E6BD333EB4CB56ED991C160753F2A465A719A309D96FBBFC297E5069316E46CAB344139D653ADD5BDDF67F10178DBC8BDCABC43D9289FC4709EFA889E00B61C55877A28433236D72356B0A33A460C6E9FDFCA2D7498CE29A6A34989E17F5A01A7AE04744430144937B57C0000B05E7E9F16B1C81CA43318BC58400D7E2CA702DB06A3333B976B651229FCF8FA93B7D1";

var prefix = 'o!';
var groupId = 4560058;
var maximumRank = 250;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('setrank', message)){
       if(!message.member.roles.some(r=>["Ranking Permissions"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You don't have the permission to use the Rank System.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
   
})
