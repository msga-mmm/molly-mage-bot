import * as assert from "assert";
import type { Position } from "classes";
import type { Clonable, MutPointer } from "interfaces";

type MatrixIterable<T> = Array<[number, number, T]>;

export default class Matrix<T> implements Clonable<Matrix<T>> {
  private content: T[][];

  /**
   * Returns a new Instance of a matrix with the dimensions of row x col
   */
  constructor(
    private readonly rows: number,
    private readonly cols: number,
    initialValue?: T
  ) {
    this.content = new Array(rows)
      .fill(initialValue)
      .map(() => new Array(cols));
  }

  raw() {
    return this.content;
  }

  fill(value: T) {
    const iterator = this.iter();

    for (const item of iterator) {
      item.set(value);
    }
  }

  /**
   * Given a matrix as: T[][]
   *
   * matrix = [
   *   [T, T, T],
   * ]
   *
   * The first array represents the rows and each row
   * contains an array that has the columns of that row,
   * so the access is:
   *
   * matrix[row][col]
   *
   */
  at({ x: col, y: row }: Position): T {
    return this.content[row][col];
  }

  setAt(row: number, col: number, value: T) {
    assert(
      row < this.rows,
      `Out of range in rows, limit: ${this.rows - 1} - requested: ${row}`
    );
    assert(
      col < this.cols,
      `Out of range in cols, limit: ${this.cols - 1} - requested: ${col}`
    );
    this.content[row][col] = value;
  }

  /**
   * T[][] to [col: number, row: number, val: T][]
   */
  enumerate(): MatrixIterable<T> {
    const iterable: MatrixIterable<T> = [];

    for (let row = 0; row < this.content.length; row++) {
      const cols = this.content[row];

      for (const [col, value] of cols.entries()) {
        iterable.push([col, row, value]);
      }
    }

    return iterable;
  }

  enumeratePointer(): Array<[number, number, MutPointer<T>]> {
    return this.enumerate().map(([col, row, _]) => [
      col,
      row,
      {
        val: () => this.content[row][col],
        set: (value: T) => (this.content[row][col] = value),
      },
    ]);
  }

  iter() {
    const iterable = [];

    for (let row = 0; row < this.content.length; row++) {
      const cols = this.content[row];

      for (let col = 0; col < cols.length; col++) {
        iterable.push({
          val: () => this.content[row][col],
          set: (value: T) => (this.content[row][col] = value),
        });
      }
    }

    return iterable;
  }

  clone(): Matrix<T> {
    const matrix = new Matrix<T>(this.rows, this.cols);
    matrix.content = this.content;

    return matrix;
  }
}
