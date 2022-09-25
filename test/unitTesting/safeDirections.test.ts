import { expect, it } from "bun:test";
import { Board } from "classes";
import { Direction } from "enums";
import { board1 } from "@test/boardExamples";
import { areEqual } from "@test/utils";

function evaluate(
  board_string: string,
  expectedDirections: Direction[]
): boolean {
  const board = new Board(board_string);

  const evaluation = areEqual(board.getSafeDirections(), expectedDirections);

  return evaluation;
}

it("safe directions: [up]", () => {
  const expectedDirections = [Direction.Up];

  const evaluation = evaluate(board1, expectedDirections);

  expect(evaluation).toBe(true);
});
