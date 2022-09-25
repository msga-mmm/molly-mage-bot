import Element from "./element";

export default class Ghost extends Element {
  static entity = "ghost";

  getEntity(): string {
    return Ghost.entity;
  }
}
