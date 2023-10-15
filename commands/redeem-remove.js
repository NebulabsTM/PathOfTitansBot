const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('redeem-remove')
		.setDescription('Add a redeem item to a player')
		.addIntegerOption(option =>
			option.setName('uid')
				.setDescription('Uid of item')
				.setRequired(true))


};