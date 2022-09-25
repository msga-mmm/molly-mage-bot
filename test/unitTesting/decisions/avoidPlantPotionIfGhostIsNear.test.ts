import Bot from "bot";
import { expect, it } from "bun:test";
import type { Command } from "enums";
import { Direction } from "enums";
import { board6 } from "@test/boardExamples";

it("avoid plating potion if ghost is near: case 1", () => {
  const bot = new Bot();

  for (let index = 0; index < 50; index++) {
    const decision = bot.rawResponse(board6);

    const decisionExpected1 = Direction.Left as unknown as Command;
    const decisionExpected2 = Direction.Right as unknown as Command;

    const evaluation =
      decision == decisionExpected1 || decision == decisionExpected2;

    if (!evaluation) {
      board6.toString();
      console.log("expected: left|right");
      console.log("received:", decision);
    }

    expect(evaluation).toBe(true);
  }
});
