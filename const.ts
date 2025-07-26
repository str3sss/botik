export const BOT_TOKEN = process.env.BOT_TOKEN;
export const HF_API_TOKEN = process.env.HF_TOKEN; // https://huggingface.co/settings/tokens
export const DEEPSEEK_TOKEN = process.env.DEEPSEEK_TOKEN;

/** ai agent and his model */
export enum MODEL_NAME {
  QWEN = 'Qwen/Qwen2.5-7B-Instruct',
  DEEPSEEK = 'deepseek-ai/DeepSeek-R1',
}
