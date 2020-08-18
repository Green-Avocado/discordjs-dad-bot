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

    var starts = [
        "im ",
        "i'm ",
        "i’m ",
        "i am "
    ];

    var s = msg.content.toLowerCase();

    if(!msg.author.bot) {
        let replied = false;

        for(let i = 0; i < starts.length; i++) {
            if(s.startsWith(starts[i])) {
                dad_joke(msg, starts[i].length);
                replied = true;
                break;
            }
        }

        if(!replied) {
            let n = -1;

            for(let i = 0; i < starts.length; i++) {
                let keyword = " " + starts[i];

                if((n == -1 || s.indexOf(keyword) < n) && s.includes(keyword)) {
                    n = s.indexOf(keyword) + keyword.length;
                }
            }

            if(n != -1) {
                dad_joke(msg, n);
            }
        }
    }
});

client.login(process.env.TOKEN);

