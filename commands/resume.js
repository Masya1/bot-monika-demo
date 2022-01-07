const Discord = require("discord.js"),
        tools = require("../tools/tools"),
        config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.voiceChannelID)
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Не получилось " + tools.GetEmoji(bot, "snapped_natsuki"))
            .setDescription("**Сначала** зайдите в голосовой канал!")
            .setColor(config.colors.red)
        );

    let { voiceConnection } = bot.guilds.get(message.guild.id)
    if(voiceConnection && message.member.voiceChannelID !== voiceConnection.channel.id)
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Не получилось " + tools.GetEmoji(bot, "snapped_natsuki"))
            .setDescription("**Вы** должны находится в одном голосовом канале со мной!")
            .setColor(config.colors.red)
        ); 

    let player = bot.music.players.get(message.guild.id);
    if(!player)
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Не получилось " + tools.GetEmoji(bot, "snapped_natsuki"))
            .setDescription("**Я** и так ничего не проигрываю!")
            .setFooter("Чтобы добавить трек, введите команду \"/play\".")
            .setColor(config.colors.red)
        );

    if(player.playing)
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Не получилось " + tools.GetEmoji(bot, "snapped_natsuki"))
            .setDescription("**Проигрывание** и так в процессе!")
            .setFooter("Чтобы приостановить проигрывание, введите \"/pause\".")
            .setColor(config.colors.red)
        ); 

    player.pause(paused = false);
    message.channel.send(
        new Discord.RichEmbed()
        .setColor(config.colors.dark_purple)
        .setDescription(":arrow_forward: Продолжаю играть мелодию.")
        .setFooter("Для приостановки проигрывания введите \"/pause\"")
    );
}


module.exports.data = {
    name: "resume",
    aliases: ["resume"],
    descriprion: "Продолжает проигрывание приостановленного плеера."
}