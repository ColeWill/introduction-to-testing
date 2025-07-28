import { Person } from './person.js';
import { rollDice } from './roll-dice.js';

export class Character extends Person {
  constructor(firstName, lastName, role, level = 1, rollThoseDice) {
    super(firstName, lastName);
    this.role = role;
    this.level = level;

    this.createdAt = new Date();
    this.lastModified = this.createdAt;

    const roll = rollThoseDice ?? rollDice(4, 6);
    this.strength = roll;
    this.dexterity = roll;
    this.intelligence = roll;
    this.wisdom = roll;
    this.charisma = roll;
    this.constitution = roll;
  }

  levelUp() {
    this.level++;
    this.lastModified = new Date();
  }
}
