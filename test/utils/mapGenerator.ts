import { Matrix } from "classes";
import { Symbols } from "elements";

function generateMap(rows: number, cols: number) {
  const matrix = new Matrix(rows, cols);

  matrix.fill(Symbols.NONE);

  for (const [col, row, pointer] of matrix.enumeratePointer()) {
    if (col == 0) {
      pointer.set(Symbols.WALL);
    }

    if (col == cols - 1) {
      pointer.set(Symbols.WALL);
    }

    if (row == 0) {
      pointer.set(Symbols.WALL);
    }

    if (row == rows - 1) {
      pointer.set(Symbols.WALL);
    }
  }

  return {
    toString: () =>
      matrix
        .iter()
        .map((iter) => iter.val())
        .join(""),
    matrix,
  };
}

export { generateMap };
