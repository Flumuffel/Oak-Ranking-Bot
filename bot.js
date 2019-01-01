// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTI5MDgxNzgwODUxMTc5NTQ3.DwuVXw.4WFK1KWszYPU9m8n_iC3a9GzGzI";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_BFFC78C8D9CE6FEAC4A2F20AC658DE74EFAB6106D6C91084F849C651FAE5BDF5A2CD4EE9596FA98378842B1DB8B5BF5A747A6DAFA2028B5723305085B829DE5BE434820711F2337DFB185C4C2470A0BC58D51B0D721E6FBDD45EA6F3DAC93567A0B7429554A7186FF7BB0B774B4435293DDCB292A59F12F09114A4C45E9D2FC29149AA48470D59691A082E2CF41A7A4DFD0EDEC405C7845B0C4C7E1A285232F1B63EFCAB20A1CED243635E4210CD1720DAAC048627494BE19DB296237068717638AB7BF1DA251AA9DA9AD295E0164AA65D10C4D5CED47A21C5BB6667C157714B40D0158B94C4413620379CFA3C7899C79DD586F5F0C78DE9EA3CBE5255D278ECDFA4497436BC18B3C4F11FD54E51B2EB2628885D216312490A94D13DE915146A97508D22";

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
