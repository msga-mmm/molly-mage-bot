import { expect, it } from "bun:test";
import { Board } from "classes";
import { Symbols } from "elements";
import { Path } from "enums";
import { Direction } from "enums";
import { areEqualInOrder } from "@test/utils";
import { generateMap } from "@test/utils/mapGenerator";
import { board2, board3 } from "@test/boardExamples";

function evaluate(board_string: string, expectedPath: Path): boolean {
  const board = new Board(board_string);

  const evaluation = areEqualInOrder(
    board.getNearestSafePlacePath(),
    expectedPath
  );

  return evaluation;
}

it("nearest safe place to right", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(p + 1, p, Symbols.POTION_TIMER_5);

  const expectedPath: Path = [Direction.Right];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to left", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = 1;

  map.matrix.setAt(p, n - 2, Symbols.HERO);
  map.matrix.setAt(p + 1, n - 2, Symbols.POTION_TIMER_5);

  const expectedPath: Path = [Direction.Left];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to down", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(p, p + 1, Symbols.POTION_TIMER_5);

  const expectedPath: Path = [Direction.Down];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to up", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = 1;

  map.matrix.setAt(n - 2, p, Symbols.HERO);
  map.matrix.setAt(n - 2, p + 1, Symbols.POTION_TIMER_5);

  const expectedPath: Path = [Direction.Up];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to up (no obstacles)", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = Math.ceil(n / 2) - 1;

  map.matrix.setAt(p, p, Symbols.HERO);

  const board = new Board();
  board.update(map.toString());

  const expectedPath: Path = [Direction.Up];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to (double obstacle)", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = Math.ceil(n / 2) - 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(p + 1, p, Symbols.POTION_TIMER_5);
  map.matrix.setAt(p - 1, p, Symbols.POTION_TIMER_5);

  const expectedPath: Path = [Direction.Left];

  const evaluation = evaluate(map.toString(), expectedPath);

  expect(evaluation).toBe(true);
});

it("nearest safe place to up|down (near to a potion bomb)", () => {
  const s = 6;
  const n = s * 2 - 1;

  const map = generateMap(n, n);

  const p = Math.ceil(n / 2) - 1;

  map.matrix.setAt(p, p, Symbols.HERO);
  map.matrix.setAt(p, p + 1, Symbols.POTION_TIMER_5);

  const expectedPath1: Path = [Direction.Up];
  const expectedPath2: Path = [Direction.Down];

  const evaluation1 = evaluate(map.toString(), expectedPath1);
  const evaluation2 = evaluate(map.toString(), expectedPath2);

  expect(evaluation1 || evaluation2).toBe(true);
});

it("nearest safe position: right|left", () => {
  const expectedPath1 = [Direction.Left];
  const expectedPath2 = [Direction.Right];

  const evaluation1 = evaluate(board2, expectedPath1);
  const evaluation2 = evaluate(board2, expectedPath2);

  const evaluation = evaluation1 || evaluation2;

  expect(evaluation).toBe(true);
});

it("nearest safe position: none", () => {
  const expectedPath: Path = [];

  const evaluation = evaluate(board3, expectedPath);

  expect(evaluation).toBe(true);
});
