const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('shop-item-add')
		.setDescription('Add an item to the shop')
		.addStringOption(option =>
			option.setName('dinosaur')
				.setDescription('The dino name')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('cost')
				.setDescription('The cost')
				.setRequired(true))

};