import Bot from "bot";
import { expect, it } from "bun:test";
import { Command } from "enums";
import { board5 } from "@test/boardExamples";

it("expected decision: none", () => {
  const bot = new Bot();

  const decision = bot.rawResponse(board5);

  const expectedDecision = Command.None;

  const evaluation = decision == expectedDecision;

  if (!evaluation) {
    bot.printBoard();
    console.log("expected:", expectedDecision);
    console.log("received:", decision);
  }

  expect(evaluation).toBe(true);
});
