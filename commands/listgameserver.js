const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('listgameserver')
		.setDescription('View your servers.')


};