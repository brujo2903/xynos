import { gameMap } from './data/mapData';
import { preDialog, postDialog, loseDialog } from './data/dialogData';
import { FINISH_ID } from './config/gameConfig';
import { renderGame } from './utils/gameRenderer';
import '@fontsource/press-start-2p';
import './styles/main.scss';
import type { GameData } from './utils/gameRenderer';

async function initializeGame(): Promise<void> {
  const gameData: GameData = {
    map: gameMap,
    preDialog,
    postDialog,
    loseDialog,
    FINISH_ID
  };

  const gameForm = document.querySelector<HTMLElement>('.game-form');
  if (gameForm) {
    await renderGame(gameForm, gameData);
  }
}

document.addEventListener('DOMContentLoaded', initializeGame);