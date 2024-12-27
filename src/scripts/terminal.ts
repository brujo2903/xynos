import { TERMINAL_CONFIG } from '../config/terminalConfig';
import { getAIResponse } from '../services/openAIService';
import { simulateTyping } from '../utils/typingEffect';
import { createMessageElement, createTypingIndicator, scrollToBottom } from '../utils/domHelpers';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector<HTMLInputElement>('.terminal-input');
  const chatContainer = document.querySelector<HTMLDivElement>('.chat-container');

  if (!input || !chatContainer) return;

  let conversationHistory = [
    { role: 'assistant', content: TERMINAL_CONFIG.INITIAL_MESSAGES[0] }
  ];

  async function handleUserInput(userInput: string) {
    input.disabled = true;

    // Add user message
    const userMessage = createMessageElement('user', userInput);
    chatContainer.appendChild(userMessage);
    scrollToBottom(chatContainer);

    // Show typing indicator
    const typingIndicator = createTypingIndicator();
    chatContainer.appendChild(typingIndicator);
    scrollToBottom(chatContainer);

    // Get AI response
    const response = await getAIResponse(userInput, conversationHistory);
    conversationHistory.push(
      { role: 'user', content: userInput },
      { role: 'assistant', content: response }
    );

    // Keep conversation history manageable
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    // Remove typing indicator and show response
    chatContainer.removeChild(typingIndicator);
    
    const agentMessage = document.createElement('div');
    agentMessage.className = 'message agent';
    const typingText = document.createElement('span');
    typingText.className = 'typing-content';
    agentMessage.appendChild(typingText);
    chatContainer.appendChild(agentMessage);
    
    simulateTyping(typingText, response, () => {
      input.disabled = false;
      input.focus();
      scrollToBottom(chatContainer);
    });
  }

  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const userInput = input.value.trim();
      input.value = '';
      await handleUserInput(userInput);
    }
  });
});