export function createMessageElement(
  type: 'user' | 'agent' | 'system',
  content: string
): HTMLDivElement {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = content;
  return messageDiv;
}

export function createTypingIndicator(): HTMLDivElement {
  const indicator = document.createElement('div');
  indicator.className = 'message agent typing-indicator';
  indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  return indicator;
}

export function scrollToBottom(element: HTMLElement): void {
  element.scrollTop = element.scrollHeight;
}