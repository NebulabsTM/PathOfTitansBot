const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('shop-item-remove')
		.setDescription('Remove an item from the shop')
		.addStringOption(option =>
			option.setName('dinosaur')
				.setDescription('The dinosaur name')
				.setRequired(true))

};