const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('ec-set')
		.setDescription('Set ERA Coins for a user')
        .addIntegerOption(option =>
			option.setName('amount')
				.setDescription('The amount')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The user')
				.setRequired(false))

};