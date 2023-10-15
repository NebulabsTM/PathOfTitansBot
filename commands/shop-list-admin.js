const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('shop-list-admin')
		.setDescription('View the shop with ids')

};