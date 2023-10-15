const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('View the leaderboard.')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The leaderboard category')
				.setRequired(true)
				.addChoices(
					{ name: 'Quests', value: 'quests' },
					{ name: 'Messages', value: 'messages' },
					{ name: 'ERA Coins', value: 'tokens' },
					{ name: 'Playtime', value: 'playtime' },
					{ name: 'Offspring', value: 'offspring' },
				))

};