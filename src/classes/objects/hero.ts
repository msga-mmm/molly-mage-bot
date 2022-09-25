import { Symbols } from "elements";
import { Direction } from "enums";
import { DIRECTIONS } from "enums";
import Element from "./element";

export default class Hero extends Element {
  public isAlive = true;

  static entity = "hero";

  getEntity(): string {
    return Hero.entity;
  }

  /**
   * Return true if a hero is locked: without possibility
   * to move to other positions because is trapped by obstacles/deadly entities
   */
  isLocked(): boolean {
    for (const dir of DIRECTIONS) {
      const pos = this.pos.clone().addDir(dir);

      const board = this.boardPointer.val();

      if (!board.isInside(this.pos)) {
        continue;
      }

      if (!board.at(pos).isAnObstacle && !board.at(pos).isDeadly) {
        return false;
      }
    }

    return true;
  }

  static fromElement(element: Element): Hero {
    const hero = new Hero(element.type, element.pos, element.boardPointer);

    return hero;
  }

  plantBombPotion() {
    const board = this.boardPointer.val();

    const matrix = board.matrix.clone();

    matrix.setAt(this.pos.y, this.pos.x, Symbols.HERO_POTION);

    board.update(
      matrix
        .iter()
        .map((iter) => iter.val())
        .join("")
    );
  }

  isOverPlantedBomb(): boolean {
    return this.type == Symbols.HERO_POTION;
  }

  move(dir: Direction): boolean {
    const board = this.boardPointer.val();

    const previousPos = this.pos.clone();
    this.pos.addDir(dir);

    if (!board.isInside(this.pos)) {
      this.pos = previousPos;
      return false;
    }

    const elementBehind = this.isOverPlantedBomb()
      ? Symbols.POTION_TIMER_5
      : Symbols.NONE;

    if (board.at(this.pos).type == Symbols.NONE) {
      const matrix = board.matrix.clone();

      matrix.setAt(previousPos.y, previousPos.x, elementBehind);
      matrix.setAt(this.pos.y, this.pos.x, Symbols.HERO);

      board.update(
        matrix
          .iter()
          .map((iter) => iter.val())
          .join("")
      );

      return true;
    }

    return false;
  }
}
