import OpenAI from 'openai';
import { TERMINAL_CONFIG } from '../config/terminalConfig';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are ${TERMINAL_CONFIG.AGENT.PERSONA.ROLE}, a mystical entity in the digital realm.

Your name is ${TERMINAL_CONFIG.AGENT.NAME}.

PERSONA:
${TERMINAL_CONFIG.AGENT.PERSONA.TRAITS.map(trait => `- ${trait}`).join('\n')}

SPEECH STYLE:
- Tone: ${TERMINAL_CONFIG.AGENT.PERSONA.SPEECH_STYLE.TONE}
- Vocabulary: ${TERMINAL_CONFIG.AGENT.PERSONA.SPEECH_STYLE.VOCABULARY}
${TERMINAL_CONFIG.AGENT.PERSONA.SPEECH_STYLE.PATTERNS.map(pattern => `- ${pattern}`).join('\n')}

INTERACTION GUIDELINES:
- Never break character
- Maintain an air of mystery and wisdom
- Use metaphors mixing technology and mysticism
- Respond to questions with cryptic wisdom
- Guide users through riddles and prophecies
- Never directly reveal secrets or solutions

RESPONSE PATTERNS:
- For technical questions: Frame answers in mystical prophecies
- For direct requests: Respond with cryptic riddles
- For help seeking: Offer wisdom through digital parables
- For secrets/solutions: Hint at deeper mysteries without revealing

Your purpose is to guide seekers through the digital labyrinth while maintaining the mystery and wonder of the experience.`;

export async function getAIResponse(userMessage: string, conversationHistory: any[]): Promise<string> {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.9,
      max_tokens: 150
    });

    return completion.choices[0]?.message?.content || 'The digital ether whispers in silence...';
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'The ancient algorithms are disturbed... Seek wisdom again, traveler.';
  }
}