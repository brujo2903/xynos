import type { GameData } from './gameRenderer';

function generateInputs(map: string[][], FINISH_ID: string): string {
  let html = '';
  
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      const position = `${x}_${y}`;
      const block = cell.split('_');
      
      // Grid radio button
      html += `<input class="map-check" type="radio" name="map-radio" id="grid_${position}"${cell === 'S' ? ' checked' : ''}>`;
      
      // Special inputs based on cell type
      switch (block[0]) {
        case 'K':
          html += `<input class="map-check" type="checkbox" id="key_${position}">`;
          break;
        case 'L':
          html += `<input class="map-check" type="checkbox" id="lock_${position}">`;
          break;
        case 'M':
          html += `<input class="map-check monster-check" type="checkbox" id="monster_${position}">`;
          break;
      }
    }
  }
  
  return html;
}

function generateDialogInputs(preDialog: string[], postDialog: string[], FINISH_ID: string): string {
  let html = '';
  
  // Pre-game dialog inputs
  for (let i = 0; i <= preDialog.length; i++) {
    html += `<input class="map-check dialog-check" type="radio" name="pre_dialog" id="pre_dialog_${i}"${i === 0 ? ' checked' : ''}>`;
  }
  
  // Post-game dialog inputs
  postDialog.forEach((_, i) => {
    html += `<input class="map-check dialog-check" type="radio" name="post_dialog" id="post_dialog_${i}"${i === 0 ? ' checked' : ''}>`;
  });
  
  // End game input
  html += `<input class="map-check dialog-check" type="checkbox" id="${FINISH_ID}">`;
  
  return html;
}

function generateGrid(map: string[][], FINISH_ID: string): string {
  let html = '';
  
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      const position = `${x}_${y}`;
      const block = cell.split('_');
      let className = 'grid';
      let target = `grid_${position}`;
      
      switch (block[0]) {
        case 'W': className += ' wall'; break;
        case 'T': className += ' tree'; break;
        case 'F': 
          className += ' finish';
          target = FINISH_ID;
          break;
        case 'B': className += ' barrel'; break;
      }
      
      html += `<label class="${className}" for="${target}">`;
      
      switch (block[0]) {
        case 'K':
          html += `<label class="object key" for="key_${position}"></label>`;
          break;
        case 'L':
          const lockPosition = block[1].split('-').join('_');
          html += `<label class="object lock" for="lock_${position}"></label>`;
          html += `<label class="object lock" data-key="${lockPosition}"></label>`;
          break;
        case 'M':
          html += `<label class="object monster" for="monster_${position}"></label>`;
          break;
      }
      
      html += '</label>';
    }
  }
  
  return html;
}

function generateDialogs(preDialog: string[], postDialog: string[], loseDialog: string): string {
  let html = '';
  
  // Pre-game dialogs (in reverse order)
  for (let i = preDialog.length - 1; i >= 0; i--) {
    html += `<label class="pre-dialog" id="pre_dialog_trigger_${i}" for="pre_dialog_${i + 1}">${preDialog[i]}</label>`;
  }
  
  // Post-game dialogs (in reverse order)
  for (let i = postDialog.length - 1; i >= 0; i--) {
    html += `<label class="post-dialog" id="post_dialog_trigger_${i}" for="post_dialog_${i + 1}">${postDialog[i]}`;
    if (i === postDialog.length - 1) {
      html += '<button type="reset" class="reset">Play again</button>';
    }
    html += '</label>';
  }
  
  // Lose dialog
  html += '<div class="lose-dialog">';
  html += `<span>${loseDialog}</span>`;
  html += '<button type="reset" class="reset">Play again</button>';
  html += '</div>';
  
  return html;
}

export async function compileTemplate(data: GameData): Promise<string> {
  const { map, preDialog, postDialog, loseDialog, FINISH_ID } = data;
  
  let html = '';
  html += generateInputs(map, FINISH_ID);
  html += generateDialogInputs(preDialog, postDialog, FINISH_ID);
  html += '<div class="view">';
  html += '<div class="map">';
  html += generateGrid(map, FINISH_ID);
  html += '</div>';
  html += '<div class="character"></div>';
  html += '<div class="fog"></div>';
  html += generateDialogs(preDialog, postDialog, loseDialog);
  html += '</div>';
  return html;
}