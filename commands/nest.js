const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('nest')
		.setDescription('Create a nest')
		.addUserOption(option => option.setRequired(true).setName('partner').setDescription('The partner'))
		.addIntegerOption(option => option.setRequired(true).setName('eggs').setDescription('The amount of eggs'))
		.addStringOption(option => option.setRequired(true).setName('description').setDescription('Description for nest'))
		.addStringOption(option =>
			option.setName('gender')
				.setDescription('Your gender')
				.setRequired(true)
				.addChoices(
					{ name: 'Male', value: 'Male' },
					{ name: 'Female', value: 'Female' },
				))
				
		.addAttachmentOption((option)=> option.setRequired(false).setName("image").setDescription("Image for nest").setRequired(true))
};