import { expect, it } from "bun:test";
import { Board, Position } from "classes";
import { Symbols } from "elements";
import { areEqualPositions } from "@test/utils";
import { generateMap } from "@test/utils/mapGenerator";

it("safe places 1", () => {
  const n = 5;
  const map = generateMap(n, n);

  const p = 1;
  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(n - 2, n - 2, Symbols.GHOST);
  map.matrix.setAt(n - 2, p, Symbols.GHOST);

  const board = new Board(map.toString());

  const expectedPositions = [
    new Position(p, p),

    new Position(p + 1, p),
    new Position(p + 2, p),

    new Position(p + 1, p + 1),
  ];

  const safePositions = [...board.getSafePositions().values()];

  const evaluation = areEqualPositions(safePositions, expectedPositions);

  if (!evaluation) {
    console.log(board.toPrettyString());
    console.log(safePositions);
  }

  expect(evaluation).toBe(true);
});
