import * as assert from "assert";
import Position from "classes/position";
import { Symbols } from "elements";
import { Direction, DIRECTIONS } from "enums";
import Element from "./element";

export default class Potion extends Element {
  public range = 3;
  public plantedBy?: string;

  static basicRange = 3;

  static entity = "potion";

  getEntity(): string {
    return Potion.entity;
  }

  hasInRange(element: Element): boolean {
    // X-axis
    for (let offsetY = -this.range; offsetY <= this.range; offsetY++) {
      if (this.pos.clone().add(offsetY, 0).isEqualTo(element.pos)) {
        return true;
      }
    }

    // Y-axis
    for (let offsetX = -this.range; offsetX <= this.range; offsetX++) {
      if (this.pos.clone().add(0, offsetX).isEqualTo(element.pos)) {
        return true;
      }
    }

    return false;
  }

  whatIsInRange(): Element[] {
    const board = this.boardPointer.val();
    const elements = new Set<Element>();

    // X-axis
    for (let offsetY = -this.range; offsetY <= this.range; offsetY++) {
      const pos = this.pos.clone().add(offsetY, 0);
      if (!this.boardPointer.val().isInBoard(pos)) {
        break;
      }

      if (!this.boardPointer.val().isInBoard(pos)) {
        elements.add(board.at(pos));
      }
    }

    // Y-axis
    for (let offsetX = -this.range; offsetX <= this.range; offsetX++) {
      const pos = this.pos.clone().add(0, offsetX);
      if (!this.boardPointer.val().isInBoard(pos)) {
        break;
      }

      if (!this.boardPointer.val().isInBoard(pos)) {
        elements.add(board.at(pos));
      }
    }

    return [...elements.keys()] as Element[];
  }

  static fromElement(element: Element): Potion {
    const potion = new Potion(element.type, element.pos, element.boardPointer);

    potion.ID = element.ID;

    return potion;
  }

  blastDirectionTo(element: Element): Direction {
    assert(
      this.hasInRange(element),
      "Blast direction cannot be guessed if the element is not in range"
    );

    let direction: Direction = Direction.Up;

    if (this.pos.x == element.pos.x) {
      direction = this.pos.y > element.pos.y ? Direction.Up : Direction.Down;
    }

    if (this.pos.y == element.pos.y) {
      direction = this.pos.x > element.pos.x ? Direction.Left : Direction.Right;
    }

    return direction;
  }

  getBlastsInDir(dir: Direction): Position[] {
    const board = this.boardPointer.val();
    const positions: Position[] = [];

    for (let offset = 1; offset <= this.range; offset++) {
      const pos = this.pos.clone().addInDir(dir, offset);

      if (!this.boardPointer.val().isInBoard(pos)) {
        break;
      }

      const element = board.at(pos);
      if (element.type == Symbols.NONE) {
        positions.push(pos);
      } else if (element.isDestroyable) {
        positions.push(pos);
        break;
      } else {
        break;
      }
    }

    return positions;
  }

  getBlastPositions(): Position[] {
    const positions: Map<string, Position> = new Map();

    // Center
    positions.set(this.pos.hash(), this.pos);

    for (const dir of DIRECTIONS) {
      this.getBlastsInDir(dir).forEach((pos) => positions.set(pos.hash(), pos));
    }

    return [...positions.values()];
  }
}
