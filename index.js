require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

function dad_joke(msg, n) {
    if(n != -1) {
        content = msg.content.substring(n);

        var ends = [
            content.indexOf("\n"),
            content.indexOf("."),
            content.indexOf(",")
        ];

        var m = -1;

        for(let i = 0; i < ends.length; i++) {
            if(m == -1 || (ends[i] < m && ends[i] != -1)) {
                m = ends[i];
            }
        }

        var name;

        if(m == -1) {
            name = content;
        }
        else {
            name = content.substring(m, -1);
        }

        msg.reply(`Hi ${name}, I'm dad!`);
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);

    var s = msg.content.toLowerCase();

    if(!msg.author.bot) {
        if(s.startsWith("im ")) {
            dad_joke(msg, 3);
        }
        else if(s.startsWith("i'm ")) {
            dad_joke(msg, 4);
        }
        else if(s.startsWith("i am ")) {
            dad_joke(msg, 5);
        }
        else if(s.includes(" im ") || s.includes(" i'm ") || s.includes(" i am ")) {
            var n = s.indexOf(" im ");

            if(n == -1 || s.indexOf(" i'm ") < n) {
                n = s.indexOf(" i'm ") + 5;
            }

            if(n == -1 || s.indexOf(" i am ") < n) {
                n = s.indexOf(" i am ") + 6;
            }

            dad_joke(msg, n);
        }
    }
});

client.login(process.env.TOKEN);

