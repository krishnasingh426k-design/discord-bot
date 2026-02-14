const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  // Ping command
  if (message.content === '!ping') {
    message.reply('Pong 🏓');
  }

  // Hello command
  if (message.content === '!hello') {
    message.reply('Hello there 👋');
  }

  // Simple moderation example
  if (message.content.startsWith('!kick')) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('You don’t have permission to kick members.');
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply('Mention someone to kick.');

    user.kick();
    message.reply(`${user.user.tag} was kicked.`);
  }
});

client.login(process.env.TOKEN); 
