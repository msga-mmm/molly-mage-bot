import { describe, expect, it } from "bun:test";
import { Board } from "classes";
import type Element from "classes/objects/element";
import Hero from "classes/objects/hero";
import { board1 } from "../boardExamples";

describe("hero", () => {
  it("case 1", () => {
    const board = new Board(board1);

    const safePositions = board.getSafePositions();

    let evaluation = false;

    board.ifExistsOne(Hero.entity, (hero: Element) => {
      evaluation = safePositions.has(hero.pos.hash());
    });

    if (!evaluation) {
      console.log(board.toString());
    }

    expect(evaluation).toBe(true);
  });
});
