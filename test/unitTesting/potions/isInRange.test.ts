import { expect, it } from "bun:test";
import { Board } from "classes";
import Hero from "classes/objects/hero";
import Potion from "classes/objects/potion";
import { Symbols } from "elements";
import { generateMap } from "@test/utils/mapGenerator";

it("potion in range", () => {
  const range = Potion.basicRange;

  for (let offsetY = 0; offsetY <= range; offsetY++) {
    const map = generateMap(6, 6);

    map.matrix.setAt(1, 1, Symbols.HERO);
    map.matrix.setAt(2 + offsetY, 1, Symbols.POTION_TIMER_5);

    const board = new Board();
    board.update(map.toString());

    const potions = board.elements.get(Potion.entity);
    const heros = board.elements.get(Hero.entity);

    if (potions != undefined && heros != undefined) {
      const potion = potions[0] as Potion;
      const hero = heros[0] as Hero;

      if (offsetY < range) {
        expect(potion.hasInRange(hero)).toBe(true);
      } else {
        expect(potion.hasInRange(hero)).toBe(false);
      }
    }
  }
});
