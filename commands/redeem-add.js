const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('redeem-add')
		.setDescription('Add a redeem item to a player')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the player')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('dinosaur')
				.setDescription('The dinosaur')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('growth')
				.setDescription('The dinosaur growth')
				.setRequired(true)
		)

};