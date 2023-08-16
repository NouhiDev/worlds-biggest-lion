require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const BOT_TOKEN = process.env.BOT_TOKEN;

const halloResponses = [
    "Hurensohn",
    "Schwächling",
    "Boldizsar Hauer",
    "Halt die Fresse",
    "Deine Mutter ist fett",
    "Hallo"
]

let consecutiveHallos = {};

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`Worlds Biggest Lion ist aktiv! (${c.user.tag})`);
})

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "hallo") {
        const randomIndex = Math.floor(Math.random() * halloResponses.length);
        const randomElement = halloResponses[randomIndex];
        const user = interaction.user.id;

        if (randomElement == "Hallo") {
            if (consecutiveHallos[user]) {
                consecutiveHallos[user].count++;
            }
            // User has not yet used /hallo
            else {
                consecutiveHallos[user] = {count: 1};
            }
            interaction.reply(`${randomElement} **🔥${consecutiveHallos[user].count}**`);
        }
        else {
            if (consecutiveHallos[user]) {
                consecutiveHallos[user].count = 0;
            }
            interaction.reply(randomElement);
        }
    }
});

client.login(BOT_TOKEN);