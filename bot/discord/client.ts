import { Client, Intents } from 'discord.js';
import initGoogleSheet from '../database/googleSheet';
import handleInteraction from './handler/handleInteraction';
import handleMessage from './handler/handleMessage';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

function handleBotReady() {
  initGoogleSheet();

  const app = client.application;
  app?.commands.set([
    {
      name: 'todo',
      description: '테스트 커맨드',
    },
    {
      name: 'add',
      description: '테스트 커맨드',
    },
  ]);

  console.log(`Logged in as ${client.user?.tag}!`);
}

export default function startBot() {
  return new Promise(() => {
    client.removeAllListeners();

    client.once('ready', handleBotReady);
    client.on('messageCreate', handleMessage);
    client.on('interactionCreate', handleInteraction);

    client.login(process.env.DISCORD_TOKEN);
  });
}
