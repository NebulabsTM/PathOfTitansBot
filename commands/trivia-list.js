const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('trivia-list')
		.setDescription('List trivia questions')


};