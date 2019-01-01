// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTI5MDgxNzgwODUxMTc5NTQ3.DwuVXw.4WFK1KWszYPU9m8n_iC3a9GzGzI";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D7B30A51FF9AD19169B843C2DCA6C3B87CEF3779A3E3A46B809D9C1798E94BDE08C462F6FD103FD5267FD6B5C2069863F405EDC2D8347EBE82A59596EBEE17ADC9B966D7881C3AB43C27E7FAD43ED1D841E2DB4803CF95F4D101C1E934BFE1A05383971B6BDDC9D557AA08E2F9092AAAA44A7AD5F259CB2DBEE04B102666BD807080561899E2FFE686D13F330235CB56CA8F9D2120EF24906C2B99B974A367DE2DEC55264D660CACF0CA9E463D77436C8B4426D52739EB2474C6DA40B86D79C5745314F3BBC583BA97A464E603F7DC15E6EDCB1B0D5DB080827321DCFF081DC508909C25CB5AB4F9C55A21219DF661F5E5721C29751A26E087C1EB8D0EE3D44CED2437C0FEEB4FF274F335A600731BEB24616E424AE6E70ED1AE5189291F1FA741C35A62";

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
