import type { Command, Direction } from "enums";

export type Clonable<T> = {
  clone(): T;
};

export class MutPointer<T> {
  constructor(public val: () => T, public set: (value: T) => void) {}
}

export class Pointer<T> {
  constructor(public val: () => T) {}
}

export type CommandType = Command | Direction;
