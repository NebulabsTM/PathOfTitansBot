const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('redeem-list')
		.setDescription('View someone their redeem items')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the player')
				.setRequired(true))
};