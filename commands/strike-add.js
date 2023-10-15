const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('strike-add')
		.setDescription('Add a strike to a player')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the player')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the strike')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The strike category')
				.setRequired(true)
				.addChoices(
					{ name: 'Realism', value: 'Realism' },
					{ name: 'SemiRealism', value: 'SemiRealism' },
					{ name: 'Community', value: 'Community' },
				))

};