import { debuglog } from "node:util";
import { Board } from "classes";
import Element from "classes/objects/element";
import Hero from "classes/objects/hero";
import { Direction } from "enums";
import { Command, DIRECTIONS } from "enums";
import { CommandType } from "interfaces";

const debug = debuglog("brain-all");

function appendPotion(dir: Command, brain: Brain): Command {
  if (brain.potionCooldown == 0) {
    brain.potionCooldown = 5;
    return `act,${dir}` as unknown as Command;
  }

  return dir;
}

function debugDecisionJustification(justification: string) {
  debug(`JUSTIFICATION: ${justification}`);
}

export default class Brain {
  public potionCooldown = 0;

  decide(board: Board): CommandType {
    if (this.potionCooldown > 0) {
      this.potionCooldown -= 1;
    }

    const safePositions = board.getSafePositions();
    const safeDirections = board.getSafeDirections();
    const nearestSafePlacePath = board.getNearestSafePlacePath();

    // If the unique safe position near is where hero is
    // then wait until there're safe places to walk
    if (safeDirections.length === 0) {
      return Command.None;
    }

    const hero = board.elements.get(Hero.entity)?.at(0);

    if (hero != undefined && !safePositions.has(hero.pos.hash())) {
      debugDecisionJustification(
        "Hero is unsafe in this position, moving to a safe place"
      );

      if (nearestSafePlacePath.length > 0) {
        return nearestSafePlacePath[0];
      }

      debugDecisionJustification("there's no where to run");
    }

    debugDecisionJustification(
      "Without strategy but running only to safe places"
    );
    if (safeDirections.length > 0) {
      const dir = safeDirections[
        Math.round(Math.random() * (safeDirections.length - 1))
      ] as unknown as Command;

      const boardClone = board.clone();

      boardClone.ifExistsOne(Hero.entity, (element: Element) => {
        const hero = element as Hero;
        hero.plantBombPotion();

        if (hero.move(dir as unknown as Direction)) {
          if (hero.isLocked()) {
            return dir;
          }

          return appendPotion(dir, this);
        }
      });
    }

    debugDecisionJustification("Without strategy");
    const dir = DIRECTIONS[
      Math.round(Math.random() * (DIRECTIONS.length - 1))
    ] as unknown as Command;
    return appendPotion(dir, this);
  }
}
