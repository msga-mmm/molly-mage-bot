enum Symbols {
  /**
   * Potion timer 5 ticks
   */
  POTION_TIMER_5 = "5",

  /**
   * Potion timer 4 ticks
   */
  POTION_TIMER_4 = "4",

  /**
   * Potion timer 3 ticks
   */
  POTION_TIMER_3 = "3",

  /**
   * Potion timer 2 ticks
   */
  POTION_TIMER_2 = "2",

  /**
   * Potion timer 1 ticks
   */
  POTION_TIMER_1 = "1",

  /**
   * Explosion. This is what potions do, everything that is
   * destroyable got destroyed.
   */
  BLAST = "҉",

  /**
   * Indestructible wall - it will not fall from potion.
   */
  WALL = "☼",

  /**
   * This is a treasure box, it opens with an explosion.
   */
  TREASURE_BOX = "#",

  /**
   * Treasure box opened. You get points if you opened it and
   * there are chances to appear a prize.
   */
  TREASURE_BOX_OPENING = "H",

  /**
   * A ghost runs over the board randomly. If a hero get touched
   * by a ghost the hero will die.
   */
  GHOST = "&",

  /**
   * Ghost corpse.
   */
  GHOST_DEAD = "x",

  /**
   * Temporarily increase potion radius blast.
   * Applicable only to new potions.
   */
  POTION_BLAST_RADIUS_INCREASE = "+",

  /**
   * Temporarily increase available potions count.
   */
  POTION_COUNT_INCREASE = "c",

  /**
   * Next several potions would be with remote control.
   * Activating by command ACT.
   */
  POTION_REMOTE_CONTROL = "r",

  /**
   * Temporarily gives you immunity from potion blasts
   * (own potion and others as well).
   */
  POTION_IMMUNE = "i",

  /**
   * Hero can shoot by poison cloud. Using=ACT(1)+Direction.
   * Temporary.
   */
  POISON_THROWER = "T",

  /**
   * Hero can explode all potions on the field. Using=ACT(2).
   */
  POTION_EXPLODER = "A",

  /**
   * A void. This is the only place where Molly can move.
   */
  NONE = " ",

  /**
   * Molly.
   */
  HERO = "☺",

  /*
   * Molly sitting on her own potion.
   */
  HERO_POTION = "☻",

  /**
   * Molly corpse.
   */
  HERO_DEAD = "Ѡ",

  /**
   * Other hero.
   */
  OTHER_HERO = "♥",

  /**
   * Other hero sitting on his own potion.
   */
  OTHER_HERO_POTION = "♠",

  /**
   * Other hero corpse.
   */
  OTHER_HERO_DEAD = "♣",

  /**
   * Enemy hero.
   */
  ENEMY_HERO = "ö",

  /**
   * Enemy hero sitting on his own potion.
   */
  ENEMY_HERO_POTION = "Ö",

  /**
   * Enemy hero corpse.
   */
  ENEMY_HERO_DEAD = "ø",
}

export default Symbols;
