import { expect, it } from "bun:test";
import { Board } from "classes";
import { Symbols } from "elements";
import { generateMap } from "@test/utils/mapGenerator";
import Hero from "classes/objects/hero";

it("hero quiet: history (no movement)", () => {
  const n = 3;
  const map = generateMap(n, n);

  map.matrix.setAt(1, 1, Symbols.HERO);

  const board = new Board();
  board.update(map.toString());

  const previousID = board.elements.get(Hero.entity)?.at(0)?.ID;

  board.update(map.toString());

  const ID = board.elements.get(Hero.entity)?.at(0)?.ID;

  let evaluation = false;

  if (previousID != undefined && ID != undefined) {
    evaluation = previousID == ID && ID != undefined && previousID != undefined;
  }

  if (!evaluation) {
    console.log(board.toPrettyString());
    console.log(`prevID: ${previousID}`);
    console.log(`currID: ${ID}`);
  }

  expect(evaluation).toBe(true);
});
