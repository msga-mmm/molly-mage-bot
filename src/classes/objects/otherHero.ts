import Board from "classes/board";
import Position from "classes/position";
import { Symbols } from "elements";
import { Pointer } from "interfaces";
import Hero from "./hero";

export default class OtherHero extends Hero {
  static entity = "other-hero";

  getEntity(): string {
    return OtherHero.entity;
  }

  constructor(state: Symbols, pos: Position, boardPointer: Pointer<Board>) {
    super(state, pos, boardPointer);
  }
}
