import { randomUUID } from "crypto";
import Board from "classes/board";
import Position from "classes/position";
import {
  DESTROYABLES,
  OBSTACLES,
  POTIONS,
  MORTALS,
  Symbols,
  BOMB_POTIONS,
  GHOSTS,
} from "elements";
import type { Direction, Path } from "enums";
import { DIRECTIONS } from "enums";
import type { Pointer } from "interfaces";

/**
 * An element is a piece that plays a role in board
 * interacting with other instances of element.
 */
export default class Element {
  public readonly isAnObstacle: boolean;
  public readonly isDestroyable: boolean;
  public readonly isAPotion: boolean;
  public readonly isABombPotion: boolean;
  public readonly isDeadly: boolean;
  public readonly isAGhost: boolean;

  constructor(
    public type: Symbols,
    public pos: Position,
    public boardPointer: Pointer<Board>
  ) {
    this.isAnObstacle = OBSTACLES.has(type);
    this.isDestroyable = DESTROYABLES.has(type);
    this.isAPotion = POTIONS.has(type);
    this.isABombPotion = BOMB_POTIONS.has(type);
    this.isDeadly = MORTALS.has(type);
    this.isAGhost = GHOSTS.has(type);
  }

  static entity = "element";

  getEntity(): string {
    return Element.entity;
  }

  /**
   * ID is a tracker for movements, history and ownership
   */
  public ID = randomUUID();

  findPathToFirstMatch(positions: Position[]): Path {
    const setPositions = new Set<string>();

    for (const pos of positions) {
      setPositions.add(pos.hash());
    }

    const visitedPositions = new Set<string>();

    visitedPositions.add(this.pos.hash());

    const stack: Array<[Position, Path, Set<string>]> = [
      [this.pos.clone(), [], visitedPositions],
    ];

    while (stack.length > 0) {
      const value = stack.shift();

      if (value == undefined) {
        break;
      }

      const [posReference, pathReference, visitedReference] = value;

      for (const dir of DIRECTIONS) {
        const pos = posReference.clone();
        const path = [...pathReference];
        const visited = new Set(visitedReference);

        pos.addDir(dir);
        path.push(dir);

        if (
          visited.has(pos.hash()) ||
          !this.boardPointer.val().isInBoard(pos) ||
          this.boardPointer.val().at(pos).isAnObstacle
        ) {
          continue;
        }

        // Return first match
        if (setPositions.has(pos.hash())) {
          return path;
        }

        // Add new consideration
        stack.push([pos, path, visited]);
      }
    }

    return [];
  }

  /**
   * Move an element in board and return true
   * if the movement was possible otherwise return false
   */
  move(dir: Direction): boolean {
    const board = this.boardPointer.val();

    const previousPos = this.pos.clone();
    this.pos.addDir(dir);

    if (board.at(this.pos).type == Symbols.NONE) {
      const matrix = board.matrix.clone();

      matrix.setAt(previousPos.y, previousPos.x, Symbols.NONE);
      matrix.setAt(this.pos.y, this.pos.x, this.type);

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

  whatIsInSurroundings(): Element[] {
    const board = this.boardPointer.val();

    const elements: Element[] = [];

    for (const dir of DIRECTIONS) {
      const pos = this.pos.clone().addDir(dir);

      if (board.isInside(pos)) {
        elements.push(board.at(pos));
      }
    }

    return elements;
  }

  whatPositionsAreAround(): Position[] {
    const board = this.boardPointer.val();

    const positions = [];

    for (const dir of DIRECTIONS) {
      const pos = this.pos.clone().addDir(dir);

      if (board.isInside(pos)) {
        positions.push(pos);
      }
    }

    return positions;
  }
}
