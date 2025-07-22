import { describe, it, expect } from 'vitest';
import { Character } from './character.js';
import { Person } from './person.js';

describe('Character', () => {
    const firstName = 'Ada';
    const lastName = 'Lovelace';
    const role = 'Computer Scientist';
  it(
    'should create a character with all of the correct properties',
    () => {
    
      const char = new Character(firstName, lastName, role );

     expect(char).toEqual({
      firstName, lastName, role,
      strength: expect.any(Number),
      wisdom: expect.any(Number),
      intelligence: expect.any(Number),
      charisma: expect.any(Number),
      constitution: expect.any(Number),
      dexterity: expect.any(Number),
      level: 1,
      createdAt: expect.any(Date),
      lastModified: expect.any(Date),
      id: expect.stringContaining('person-'),
     })
    },
  );

  it('should allow you to increase the level', () => {
    const char = new Character(firstName, lastName, role);
    const initialLevel = char.level;

    expect(initialLevel).toBe(1);

    char.levelUp();

    expect(char.level).toBeGreaterThan(initialLevel);
  });

  it('should update the last modified date when leveling up', () => {
    const character = new Character(firstName, lastName, role);

    const initialDate = character.lastModified;

    character.levelUp();

    expect(character.lastModified).not.toBe(initialDate);
  });
});
