import { expect, it } from "bun:test";
import { Board } from "classes";
import Hero from "classes/objects/hero";
import { Symbols } from "elements";
import { generateMap } from "@test/utils/mapGenerator";

it("hero quiet: history (move 1)", () => {
  const n = 5;

  const board = new Board();

  const p = 1;

  const map1 = generateMap(n, n);

  map1.matrix.setAt(p, p, Symbols.HERO);
  board.update(map1.toString());
  const previousID = board.elements.get(Hero.entity);
  console.log(board.toPrettyString());

  const map2 = generateMap(n, n);

  map2.matrix.setAt(p, p + 1, Symbols.HERO);
  board.update(map2.toString());
  const ID = board.elements.get(Hero.entity);
  console.log(board.toPrettyString());

  const evaluation = previousID == ID;

  if (!evaluation) {
    console.log(board.toPrettyString());
    console.log(`prevID: ${previousID}`);
    console.log(`currID: ${ID}`);
  }

  expect(evaluation).toBe(true);
});
