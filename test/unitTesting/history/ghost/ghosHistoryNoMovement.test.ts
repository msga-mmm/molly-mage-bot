import { expect, it } from "bun:test";
import { Board, Position } from "classes";
import { Symbols } from "elements";
import { generateMap } from "@test/utils/mapGenerator";

it("ghost quiet: history (no movement)", () => {
  const n = 3;
  const map = generateMap(n, n);

  const ghostPos = new Position(1, 1);

  map.matrix.setAt(ghostPos.y, ghostPos.x, Symbols.GHOST);

  const board = new Board();
  board.update(map.toString());

  const previousID = board.positions.get(ghostPos.hash())?.ID;

  board.update(map.toString());

  const ID = board.positions.get(ghostPos.hash())?.ID;

  const evaluation = previousID == ID;

  if (!evaluation) {
    console.log(board.toPrettyString());
    console.log(`prevID: ${previousID}`);
    console.log(`currID: ${ID}`);
  }

  expect(evaluation).toBe(true);
});
