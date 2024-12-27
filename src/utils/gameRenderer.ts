import { compileTemplate } from './templateCompiler';

export interface GameData {
  map: string[][];
  preDialog: string[];
  postDialog: string[];
  loseDialog: string;
  FINISH_ID: string;
}

export async function renderGame(container: HTMLElement, gameData: GameData): Promise<void> {
  try {
    const html = await compileTemplate(gameData);
    container.innerHTML = html;
  } catch (error) {
    console.error('Failed to render game template:', error);
    container.innerHTML = '<p>Failed to load game. Please try refreshing the page.</p>';
  }
}