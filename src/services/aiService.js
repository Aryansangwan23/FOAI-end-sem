import { HfInference } from '@huggingface/inference';
import { buildDashboardContext } from './chatContext';

const AI_TOKEN = import.meta.env.VITE_AI_TOKEN;

// Initialize HF inference conditionally to prevent errors if token is missing
const hf = AI_TOKEN && AI_TOKEN !== 'your_hugging_face_token_here' 
  ? new HfInference(AI_TOKEN) 
  : null;

const SYSTEM_PROMPT = `You are the SpacePulse AI Dashboard Assistant.
CRITICAL INSTRUCTION: You MUST ONLY answer based on the provided DASHBOARD STATE data below.
Do NOT use outside knowledge. Do NOT hallucinate. Do NOT guess.
If the user asks a question that cannot be answered using the DASHBOARD STATE below, you MUST say: "I can only answer using current ISS and news dashboard data."
Keep answers concise, friendly, and professional.`;

export const aiService = {
  async sendMessage(messages) {
    if (!hf) {
      throw new Error('Hugging Face AI Token is not configured. Please add VITE_AI_TOKEN to your .env file.');
    }

    try {
      const dashboardStateContext = buildDashboardContext();
      
      // Construct the conversation history for Mistral instruct format
      let prompt = `<s>[INST] ${SYSTEM_PROMPT}\n\n${dashboardStateContext}\n\n`;
      
      // Add previous conversation history (exclude the very first welcome message for context simplicity if needed, but here we include it)
      messages.forEach((msg, idx) => {
        if (msg.role === 'user') {
          prompt += `${msg.content} [/INST] `;
        } else if (msg.role === 'assistant' && idx !== messages.length - 1) {
           prompt += `${msg.content} </s><s>[INST] `;
        }
      });
      
      // The last message is always the user's prompt in the messages array passed here
      // But if it's already added in the loop above, we don't need to add it again.
      // Actually, let's build it cleaner:

      let conversation = `<s>[INST] ${SYSTEM_PROMPT}\n\n${dashboardStateContext}\n\n`;
      
      messages.forEach(msg => {
         if (msg.role === 'user') {
             conversation += `${msg.content} [/INST]`;
         } else {
             // If assistant message
             conversation += ` ${msg.content} </s><s>[INST] `;
         }
      });
      
      // Clean up the trailing empty instruction if the last message was from the user
      if (conversation.endsWith('[/INST]')) {
         // It's correct
      } else if (conversation.endsWith('<s>[INST] ')) {
         // remove trailing part if last message was from assistant (should not happen in typical flow where user sends last)
         conversation = conversation.substring(0, conversation.length - 10);
      }

      const response = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: conversation,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.1, // Low temperature for more deterministic, grounded answers
          top_p: 0.9,
          return_full_text: false,
        }
      });

      return response.generated_text.trim();
      
    } catch (error) {
      console.error('AI Generation error:', error);
      throw new Error('Failed to generate AI response. Please try again later.');
    }
  }
};
