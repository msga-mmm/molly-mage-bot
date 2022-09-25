import Hero from "./hero";

export default class EnemyHero extends Hero {
  static entity = "enemy-hero";

  getEntity(): string {
    return EnemyHero.entity;
  }
}
