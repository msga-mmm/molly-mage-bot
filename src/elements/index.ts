import Symbols from "./symbols";

// Heroe cannot walk over this objects
export const OBSTACLES = new Set([
  Symbols.WALL,
  Symbols.TREASURE_BOX,

  Symbols.POTION_TIMER_1,
  Symbols.POTION_TIMER_2,
  Symbols.POTION_TIMER_3,
  Symbols.POTION_TIMER_4,
  Symbols.POTION_TIMER_5,

  Symbols.OTHER_HERO,
  Symbols.OTHER_HERO_POTION,

  Symbols.ENEMY_HERO,
  Symbols.ENEMY_HERO_POTION,
]);

export const DESTROYABLES = new Set([
  Symbols.TREASURE_BOX,
  Symbols.GHOST,
  Symbols.HERO,
  Symbols.HERO_POTION,
  Symbols.OTHER_HERO,
  Symbols.OTHER_HERO_POTION,
  Symbols.ENEMY_HERO,
  Symbols.ENEMY_HERO_POTION,
]);

export const POTIONS = new Set([
  Symbols.POTION_IMMUNE,
  Symbols.POISON_THROWER,
  Symbols.POTION_TIMER_1,
  Symbols.POTION_TIMER_2,
  Symbols.POTION_TIMER_3,
  Symbols.POTION_TIMER_4,
  Symbols.POTION_TIMER_5,
  Symbols.POTION_EXPLODER,
  Symbols.POTION_COUNT_INCREASE,
  Symbols.POTION_REMOTE_CONTROL,
  Symbols.POTION_BLAST_RADIUS_INCREASE,

  Symbols.HERO_POTION,
  Symbols.OTHER_HERO_POTION,
  Symbols.ENEMY_HERO_POTION,
]);

export const BOMB_POTIONS = new Set([
  Symbols.POTION_IMMUNE,
  Symbols.POISON_THROWER,
  Symbols.POTION_TIMER_1,
  Symbols.POTION_TIMER_2,
  Symbols.POTION_TIMER_3,
  Symbols.POTION_TIMER_4,
  Symbols.POTION_TIMER_5,

  Symbols.HERO_POTION,
  Symbols.OTHER_HERO_POTION,
  Symbols.ENEMY_HERO_POTION,
]);

export const MORTALS = new Set([...BOMB_POTIONS, Symbols.GHOST]);

export const GHOSTS = new Set([Symbols.GHOST, Symbols.GHOST_DEAD]);

export { default as Symbols } from "./symbols";
