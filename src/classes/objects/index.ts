import Board from "classes/board";
import { Symbols } from "elements";
import { Pointer } from "interfaces";
import Position from "classes/position";
import OtherHero from "classes/objects/otherHero";
import Element from "./element";

import Hero from "./hero";
import EnemyHero from "./enemyHero";

function classify(type: Symbols, pos: Position, boardPointer: Pointer<Board>) {
  let element = new Element(type, pos, boardPointer);

  switch (type) {
    case Symbols.HERO:
    case Symbols.HERO_POTION:
    case Symbols.HERO_DEAD:
      element = new Hero(type, pos, boardPointer);
      break;

    case Symbols.OTHER_HERO:
    case Symbols.OTHER_HERO_POTION:
    case Symbols.OTHER_HERO_DEAD:
      element = new OtherHero(type, pos, boardPointer);
      break;

    case Symbols.ENEMY_HERO:
    case Symbols.ENEMY_HERO_POTION:
    case Symbols.ENEMY_HERO_DEAD:
      element = new EnemyHero(type, pos, boardPointer);
      break;

    default:
      break;
  }

  return element;
}

export { classify };
