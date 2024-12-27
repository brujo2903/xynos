export const GRID_CONFIG = {
  REPEAT_X: 10,
  REPEAT_Y: 10,
  VISIBLE_COUNT_X: 3,
  VISIBLE_COUNT_Y: 3
};

export const DIALOG_CONFIG = {
  PRE_DIALOG_COUNT: 3,
  POST_DIALOG_COUNT: 2
};

export const TILE_TYPES = {
  START: 'S',
  FINISH: 'F',
  KEY: 'K',
  LOCK: 'L',
  WALL: 'W',
  TREE: 'T',
  BARREL: 'B',
  MONSTER: 'M',
  PORTAL: 'P',
  FLOOR: ' '
} as const;

export const FINISH_ID = 'show_post_dialog';

export const PORTAL_CONFIG = {
  COOLDOWN: 1000, // ms before portal can be used again
  TRANSITION_DURATION: 500 // ms for portal animation
};