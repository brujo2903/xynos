import { TILE_TYPES } from '../config/gameConfig';
import { areaNames } from './dialogData';
import { mainArea } from './maps/mainArea';
import { crystalCave } from './maps/crystalCave';
import { ancientTemple } from './maps/ancientTemple';
import { darkCatacombs } from './maps/darkCatacombs';
import { enchantedGarden } from './maps/enchantedGarden';
import { frozenCaverns } from './maps/frozenCaverns';
import { lavaChambers } from './maps/lavaChambers';
import { abandonedMine } from './maps/abandonedMine';

// Map areas with their connections and Greek-themed names
export const mapAreas = [
  { id: 0, map: mainArea, name: areaNames.mainArea },
  { id: 1, map: crystalCave, name: areaNames.crystalCave },
  { id: 2, map: ancientTemple, name: areaNames.ancientTemple },
  { id: 3, map: enchantedGarden, name: areaNames.enchantedGarden },
  { id: 4, map: darkCatacombs, name: areaNames.darkCatacombs },
  { id: 5, map: frozenCaverns, name: areaNames.frozenCaverns },
  { id: 6, map: lavaChambers, name: areaNames.lavaChambers },
  { id: 7, map: abandonedMine, name: areaNames.abandonedMine }
];

// Current active map (starts with main area)
export const gameMap = mainArea;