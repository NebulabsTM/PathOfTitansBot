const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('addgameserver')
		.setDescription('Add a gameserver to your Discord')
		.addStringOption(option =>
			option.setName('ip')
				.setDescription('The IP Adress')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('port')
                .setDescription('The port')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('password')
                .setDescription('The password')
                .setRequired(true))

};