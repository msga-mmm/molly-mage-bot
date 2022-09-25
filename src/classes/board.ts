import * as assert from "assert";
import { Symbols } from "elements";
import { Clonable } from "interfaces";
import { Pointer } from "interfaces";
import { Direction, Path } from "enums";
import { DIRECTIONS } from "enums";
import SquareMatrix from "./matrix/squareMatrix";
import Position from "./position";
import { classify } from "./objects";
import Element from "./objects/element";
import Potion from "./objects/potion";
import Hero from "./objects/hero";

class Board implements Clonable<Board> {
  public matrix = new SquareMatrix<string>(0);

  // Board limits
  public highestLimit = 0;
  public lowestLimit = 0;

  /**
   * Elment.entity to Elements correlation
   */
  public elements = new Map<string, Element[]>();

  /**
   * Position to Element correlation
   */
  public positions = new Map<string, Element>();

  constructor(board_string?: string) {
    if (board_string != undefined) {
      this.update(board_string);
    }
  }

  update(board_string: string) {
    const board = SquareMatrix.fromVector(board_string.split(""));
    this.matrix = board;

    this.highestLimit = this.matrix.diagonal - 1;
    this.lowestLimit = 0;

    this.ubicate();
  }

  ubicate() {
    this.positions.clear();
    this.elements.clear();

    for (const [col, row, ch] of this.matrix.enumerate()) {
      const pos = new Position(col, row);
      const type = ch as Symbols;
      const element = classify(type, pos, new Pointer(() => this));

      this.positions.set(pos.hash(), element);

      const elements = this.elements.get(element.getEntity()) || [];
      elements.push(element);
      this.elements.set(element.getEntity(), elements);
    }
  }

  /**
   * From:
   *
   * [
   *   ['#', '#', '#'],
   *   ['#', '#', '#'],
   * ]
   *
   * To: "###\n###"
   *
   * Printed as:
   *
   * ###
   * ###
   */
  toPrettyString(): string {
    return (
      this.matrix
        .raw()
        // fixer for bad board formatting
        .map((cols) => cols.join(",").replaceAll(",", ""))
        .join("\n")
    );
  }

  toString(): string {
    return (
      this.matrix
        .raw()
        // fixer for bad board formatting
        .map((cols) => cols.join(",").replaceAll(",", ""))
        .join("")
    );
  }

  isInBoard(pos: Position): boolean {
    return (
      pos.x >= this.lowestLimit &&
      pos.x <= this.highestLimit &&
      pos.y >= this.lowestLimit &&
      pos.y <= this.highestLimit
    );
  }

  /**
   * Position to Element correlation
   */
  at(pos: Position): Element {
    const element = this.positions.get(pos.hash());

    assert(
      element != undefined,
      [
        "Each position in board must be a valid element (not-undefined)",
        `    Position: (${pos.x}, ${pos.y}) doesn't have an element representation in board`,
      ].join("\n")
    );

    assert(
      this.isInBoard(pos),
      [
        "Position not in board range",
        `    Position: (${pos.x}, ${pos.y}) out of range in board `,
        `        x = (${this.lowestLimit}:${this.highestLimit})`,
        `        y = (${this.lowestLimit}:${this.highestLimit})`,
      ].join("\n")
    );

    return element;
  }

  isInside(pos: Position): boolean {
    return (
      pos.x > this.lowestLimit &&
      pos.x < this.highestLimit &&
      pos.y > this.lowestLimit &&
      pos.y < this.highestLimit
    );
  }

  clone(): Board {
    const board = new Board();
    board.update(this.toString());

    return board;
  }

  getSafePositions(): Map<string, Position> {
    const unsafePositions = new Map<string, Position>();
    const safePositions = new Map<string, Position>();

    for (const element of this.positions.values()) {
      const pos = element.pos;

      if (element.isABombPotion) {
        const potion = Potion.fromElement(element);
        for (const pos of potion.getBlastPositions()) {
          unsafePositions.set(pos.hash(), pos);
        }
      } else if (element.isAGhost) {
        unsafePositions.set(pos.hash(), pos);

        // Due to the random walking of the ghosts
        // their surroundings are considered unsafe.
        for (const dir of DIRECTIONS) {
          const ghostPos = pos.clone().addDir(dir);
          unsafePositions.set(ghostPos.hash(), ghostPos);
        }
      } else if (element.isDeadly) {
        unsafePositions.set(pos.hash(), pos);
      }
    }

    for (const element of this.positions.values()) {
      const pos = element.pos;

      if (!unsafePositions.has(pos.hash()) && this.isInside(pos)) {
        safePositions.set(pos.hash(), pos);
      }
    }

    return safePositions;
  }

  getSafeDirections(): Direction[] {
    const safeDirections: Direction[] = [];

    for (const dir of DIRECTIONS) {
      const hero = this.elements.get(Hero.entity)?.at(0);

      if (hero != undefined) {
        const pos = hero.pos.clone().addDir(dir);
        if (
          this.getSafePositions().has(pos.hash()) &&
          this.at(pos).type == Symbols.NONE
        ) {
          safeDirections.push(dir);
        }
      }
    }

    return safeDirections;
  }

  ifExistsOne<T>(entity: string, callback: (element: Element) => T) {
    this.ifExists(entity, (elements: Element[]) => {
      const firstElement = elements.at(0);

      if (firstElement != undefined) {
        callback(firstElement);
      }
    });
  }

  ifExists<T>(entity: string, callback: (element: Element[]) => T) {
    const elements = this.elements.get(entity);

    if (elements != undefined) {
      callback(elements);
    }
  }

  getNearestSafePlacePath(): Path {
    let path: Path = [];

    this.ifExistsOne(Hero.entity, (hero: Element) => {
      const safePositions = [...this.getSafePositions().values()];
      path = hero.findPathToFirstMatch(safePositions);
    });

    return path;
  }
}

export default Board;
