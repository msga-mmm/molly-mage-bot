import { expect, it } from "bun:test";
import { Board, Position } from "classes";
import { Symbols } from "elements";
import { areEqualPositions } from "@test/utils";
import { generateMap } from "@test/utils/mapGenerator";

it("safe places", () => {
  const n = 4;

  const map = generateMap(n, n);

  const p = 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(p, n - 2, Symbols.POTION_TIMER_5);

  const board = new Board(map.toString());

  const safePlacesExpected = [new Position(1, 2)];

  const safePositions = [...board.getSafePositions().values()];

  expect(areEqualPositions(safePositions, safePlacesExpected)).toBe(true);
});
