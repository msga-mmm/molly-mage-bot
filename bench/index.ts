import Bot from "bot";
import { Command } from "enums";
import { run, bench, group, baseline } from "mitata";
import { board1 } from "@test/boardExamples";

const noop = () => Command.Act;

const benchBot = () => {
  const bot = new Bot();
  return bot.response(board1);
};

group("bot response", () => {
  baseline("noop", noop);
  bench("bot", benchBot);
});

await run({
  avg: true,
  json: false,
  colors: true,
  min_max: true,
  collect: false,
  percentiles: false,
});
