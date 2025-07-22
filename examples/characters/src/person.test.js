import { describe, it, expect } from 'vitest';
import { Person } from './person.js';

describe('Person', () => {
  // This test will fail. Why?
  // Because the id on the person class is random every time a new one is created
  it('should create a person with a first name and last name', () => {
    const person = new Person('Grace', 'Hopper');
    expect(person).toEqual({
      id: expect.stringContaining('person-'),
      firstName: 'Grace',
      lastName: 'Hopper',
    });
  });
});
