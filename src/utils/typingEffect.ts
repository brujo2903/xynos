export function simulateTyping(
  element: HTMLElement, 
  text: string, 
  callback?: () => void,
  options = { minDelay: 30, maxDelay: 80 }
): void {
  let index = 0;
  element.textContent = '';
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      const delay = Math.random() * (options.maxDelay - options.minDelay) + options.minDelay;
      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }
  
  type();
}