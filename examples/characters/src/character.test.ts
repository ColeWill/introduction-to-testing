import { describe, it, expect, vi } from 'vitest';
import { Character } from './character.js';
import { Person } from './person.js';
import { rollDice } from './roll-dice.js';

describe('Character', () => {
  const firstName = 'Ada';
  const lastName = 'Lovelace';
  const role = 'Computer Scientist';
  const level = 1;
  let character;

  beforeEach(() => {
    // I don't need to call this anywhere, vi will override anywhere that
    // Math.random() is called in my tests and give it the mock value = 12.
    // Now the randomness is controlled
    const randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);

    const mockDiceRoll = rollDice(4, 6); // this is controlled by our mock
    character = new Character(firstName, lastName, role, level, mockDiceRoll);
  });

  it('should create a character with all of the correct properties', () => {
    expect(character).toEqual({
      firstName,
      lastName,
      role,
      // strength: expect.any(Number),
      strength: 12,
      // wisdom: expect.any(Number),
      wisdom: 12,
      intelligence: expect.any(Number),
      charisma: expect.any(Number),
      constitution: expect.any(Number),
      dexterity: expect.any(Number),
      level: 1,
      createdAt: expect.any(Date),
      lastModified: expect.any(Date),
      id: expect.stringContaining('person-'),
    });
  });

  it('should allow you to increase the level', () => {
    const initialLevel = character.level;

    expect(initialLevel).toBe(1);

    character.levelUp();

    expect(character.level).toBeGreaterThan(initialLevel);
  });

  it('should update the last modified date when leveling up', () => {
    const initialDate = character.lastModified;

    character.levelUp();

    expect(character.lastModified).not.toBe(initialDate);
  });
});
