const {REST, Routes} = require("discord.js");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_APPLICATION_ID = process.env.BOT_APPLICATION_ID;
const SERVER_ID = process.env.SERVER_ID;

const commands = [
    {
        name: "hallo",
        description: "Ich habe Angst"
    }
]

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

(async () => {
    try 
    {
        console.log("Registering / commands...")

        await rest.put(
            Routes.applicationGuildCommands(BOT_APPLICATION_ID, SERVER_ID),
             {
                body: commands
             }
        )

        console.log("Successfully registered / commands!")
    } 
    catch (error) {
        console.log(error);
    }
})();