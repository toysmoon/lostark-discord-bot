import { Client, Intents } from 'discord.js';
import initGoogleSheet from '../database/googleSheet';
import handleInteraction from './handleInteraction';
import handleMessage from './handleMessage';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export default function startBot() {
  client.once('ready', () => {
    initGoogleSheet();
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on('messageCreate', handleMessage);
  client.on('interactionCreate', handleInteraction);
  client.login(process.env.DISCORD_TOKEN);
}
