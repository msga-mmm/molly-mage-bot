import * as assert from "assert";
import { Direction } from "enums";
import { Clonable } from "interfaces";

/**
 * Point - P(x, y)
 *
 * @param x: number
 * @param y: number
 */
export default class Position implements Clonable<Position> {
  // Public hash: string;

  /**
   * P(x, y) or M(col, row)
   */
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  isEqualTo(pos: Position): boolean {
    return this.x == pos.x && this.y == pos.y;
  }

  static dirToPosition(dir: Direction): Position {
    switch (dir) {
      case Direction.Up:
        return new Position(0, -1);

      case Direction.Down:
        return new Position(0, 1);

      case Direction.Right:
        return new Position(1, 0);

      case Direction.Left:
        return new Position(-1, 0);
    }
  }

  addDir(dir: Direction): this {
    const pos = Position.dirToPosition(dir);
    this.add(pos.y, pos.x);

    return this;
  }

  substractDir(dir: Direction): this {
    const pos = Position.dirToPosition(dir);
    this.add(-pos.y, -pos.x);

    return this;
  }

  add(rows: number, cols: number): this {
    this.x += cols;
    this.y += rows;

    return this;
  }

  mult(x: number, y: number): this {
    this.x *= x;
    this.y *= y;

    return this;
  }

  multDir(dir: Direction): this {
    const pos = Position.dirToPosition(dir);
    this.mult(pos.x, pos.y);

    return this;
  }

  addInDir(dir: Direction, scalar: number): this {
    const pos = Position.dirToPosition(dir);

    const offset = pos.clone().mult(scalar, scalar);

    this.add(offset.y, offset.x);

    return this;
  }

  hash(): string {
    return `${this.x}:${this.y}`;
  }

  clone(): Position {
    return new Position(this.x, this.y);
  }

  static fromHash(hash: string): Position {
    const [sx, sy] = hash.split(":");

    const x = Number.parseInt(sx);
    const y = Number.parseInt(sy);

    assert(
      x != undefined && y != undefined,
      `Error parsing hashPosition to Position: (${hash})`
    );

    return new Position(x, y);
  }
}
