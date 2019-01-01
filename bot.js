// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTI5MDgxNzgwODUxMTc5NTQ3.DwuVXw.4WFK1KWszYPU9m8n_iC3a9GzGzI";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_680A4B194C07953B4760FB88E2F863383FAB3AF2B26360A363D04C5541155F03FE0210B3019819DFF99BBE42B829AB0C4B5297459CD914088396C108FF50786B8B28A5269F0F82324B18D512B4A4E9C0286AA6E83BC21C10DB5B8557E1CF07386902AAE43EE315DED8F23A0594928441275653A0AD181B88FBE089D8E9F5467AC98AAF9DCFED8677392D293FC47249E139FDAF535E7E046CECB003CF56CEBA75D07D50CFF0C4E04271D3890D3E7CD13D2335D7AC6A68FAA527DFE686409B6961C3162E57D930A4148A390757B71F99A060EDC0FBC873401AFCD0982793B87389251566A7E7EB6499F7C7AE74CC5A54FAEF7521738844D1016131CA43C1A2155F3EE4B46581BF79A54C82D37C569751F1F7A8947ADE7EDDA6C6F477E8D6002E4F0E9E68DD";

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
