import { it, expect } from "bun:test";
import { Board, Position } from "classes";
import Potion from "classes/objects/potion";
import { Symbols } from "elements";
import { areEqualPositions } from "@test/utils";
import { generateMap } from "@test/utils/mapGenerator";

it("blasts positions", () => {
  it("no obstacles", () => {
    const s = 6;
    const n = s * 2 - 1;

    const map = generateMap(n, n);

    const p = Math.ceil(n / 2 - 1);

    map.matrix.setAt(p, p, Symbols.POTION_TIMER_5);

    const board = new Board();
    board.update(map.toString());

    const blastsPositionsExpected = [
      // Center
      new Position(p, p),

      // Up blasts
      new Position(p, p + 1),
      new Position(p, p + 2),
      new Position(p, p + 3),

      // Down blasts
      new Position(p, p - 1),
      new Position(p, p - 2),
      new Position(p, p - 3),

      // Left blasts
      new Position(p - 1, p),
      new Position(p - 2, p),
      new Position(p - 3, p),

      // Right blasts
      new Position(p + 1, p),
      new Position(p + 2, p),
      new Position(p + 3, p),
    ];

    let evaluation = false;

    const potions = board.elements.get(Potion.entity);

    if (potions != undefined) {
      const potion = potions[0] as Potion;
      evaluation = areEqualPositions(
        blastsPositionsExpected,
        potion.getBlastPositions()
      );
    }

    expect(evaluation).toBe(true);
  });

  it("with obstacles", () => {
    const s = 6;
    const n = s * 2 - 1;

    const map = generateMap(n, n);

    const p = Math.ceil(n / 2 - 1);

    map.matrix.setAt(p, p, Symbols.POTION_TIMER_5);
    map.matrix.setAt(p, p + 1, Symbols.WALL);
    map.matrix.setAt(p, p - 1, Symbols.WALL);
    map.matrix.setAt(p + 1, p, Symbols.WALL);
    map.matrix.setAt(p - 1, p, Symbols.WALL);

    const board = new Board();
    board.update(map.toString());

    const blastsPositionsExpected = [
      // Center
      new Position(p, p),
    ];

    let evaluation = false;

    const potions = board.elements.get(Potion.entity);

    if (potions != undefined) {
      const potion = potions[0] as Potion;
      evaluation = areEqualPositions(
        blastsPositionsExpected,
        potion.getBlastPositions()
      );
    }

    expect(evaluation).toBe(true);
  });

  it("hero, other heros and enemy heros", () => {
    const s = 6;
    const n = s * 2 - 1;

    const map = generateMap(n, n);

    const p = Math.ceil(n / 2 - 1);

    map.matrix.setAt(p, p, Symbols.POTION_TIMER_5);
    map.matrix.setAt(p, p + 1, Symbols.HERO);
    map.matrix.setAt(p, p - 1, Symbols.OTHER_HERO);
    map.matrix.setAt(p + 1, p, Symbols.ENEMY_HERO);
    map.matrix.setAt(p - 1, p, Symbols.OTHER_HERO);

    const board = new Board();
    board.update(map.toString());

    const blastsPositionsExpected = [
      // Center
      new Position(p, p),

      // Sides
      new Position(p, p + 1),
      new Position(p, p - 1),
      new Position(p + 1, p),
      new Position(p - 1, p),
    ];

    let evaluation = false;

    const potions = board.elements.get(Potion.entity);

    if (potions != undefined) {
      const potion = potions[0] as Potion;
      evaluation = areEqualPositions(
        blastsPositionsExpected,
        potion.getBlastPositions()
      );
    }

    expect(evaluation).toBe(true);
  });
});
