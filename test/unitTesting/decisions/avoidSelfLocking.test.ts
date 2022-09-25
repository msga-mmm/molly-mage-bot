import Bot from "bot";
import { expect, it } from "bun:test";
import { Command, Direction } from "enums";
import { board4 } from "@test/boardExamples";

it("avoid self locking: case 1 (mostly right)", () => {
  const bot = new Bot();

  // noise threshold
  for (let index = 0; index < 50; index++) {
    const decision = bot.rawResponse(board4);

    const notExpected = Command.Act + "," + Direction.Left;

    const evaluation = decision != notExpected;

    if (!evaluation) {
      bot.printBoard();
      console.log("not expected:", notExpected);
      console.log("received:", decision);
    }

    expect(evaluation).toBe(true);
  }
});
