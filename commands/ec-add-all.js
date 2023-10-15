const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('ec-add-all')
		.setDescription('Give ERA Coins to everyone')
        .addIntegerOption(option =>
			option.setName('amount')
				.setDescription('The amount')
				.setRequired(true))


};