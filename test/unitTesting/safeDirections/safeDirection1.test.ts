import { expect, it } from "bun:test";
import { Board } from "classes";
import { Symbols } from "elements";
import { Direction } from "enums";
import { areEqual } from "@test/utils";
import { generateMap } from "@test/utils/mapGenerator";

it("safe directions: case 1", () => {
  const n = 7;
  const map = generateMap(n, n);
  const p = 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(n - 2, n - 2, Symbols.GHOST);
  map.matrix.setAt(n - 2, p, Symbols.GHOST);
  map.matrix.setAt(p, n - 2, Symbols.POTION_TIMER_5);

  const board = new Board();
  board.update(map.toString());

  const expectedDirections = [Direction.Down];

  const safeDirections = board.getSafeDirections();

  const evaluation = areEqual(safeDirections, expectedDirections);

  if (!evaluation) {
    console.log(board.toPrettyString());
    console.log(safeDirections);
  }

  expect(evaluation).toBe(true);
});
