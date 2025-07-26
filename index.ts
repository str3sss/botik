import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { InferenceClient } from '@huggingface/inference';
import 'dotenv/config';

import { BOT_TOKEN, HF_API_TOKEN, MODEL_NAME } from './const.ts';

const client = new InferenceClient(HF_API_TOKEN);

async function getAnswer(text: string) {
  try {
    const result = await client.chatCompletion({
      model: MODEL_NAME.DEEPSEEK,
      messages: [{ role: 'user', content: text }],
      max_tokens: 512,
    });

    return result.choices[0]?.message.content ?? 'нет ответа';
  } catch (error: any) {
    if (error?.response?.status === 503) {
      return 'Модель загружается, попробуйте через 10-20 секунд';
    }

    if (error?.message?.includes('quota')) {
      return 'Превышен лимит запросов (300/час)';
    }

    return `Ошибка API: ${error.message || 'неизвестная ошибка'}`;
  }
}

const bot = new Telegraf(BOT_TOKEN ?? '');

bot.start((ctx) => ctx.reply('Привет'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.on(message('text'), async (ctx) => {
  const result = await getAnswer(ctx.message.text);

  return ctx.reply(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
