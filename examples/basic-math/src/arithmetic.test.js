import { describe, it, expect } from 'vitest';
import { add, multiply, subtract, divide } from './arithmetic.js';

describe('add', () => {
    it('should add 2 positive numbers', () =>{
        expect(add(2,2)).toBe(4)
    });

    it('should add 2 negative numbers', () => {
        expect(add(-1, -4)).toBe(-5);
    });

    it('should parse strings into numbers', () => {
        expect(add('1', '190')).toBe(191);

        expect(add('-2', '-7')).toBe(-9);
    });
    it('should get angry if you dont give the function a number that can be parsed', () => {
        expect(() => add('potato', 2)).toThrow();
    });
});

describe('subtract', () => {
    it('should subtract 2 positive numbers', ()=>{
        expect(subtract(10, 5)).toBe(5);
    });

    it('should subtract all of the numbers if you pass an array as the first argument',  () => {
        expect(subtract([10,5], 2)).toBe(3);
    });

    it('should default a value to zero if no arg is passed', ()=>{
        expect(subtract()).toBe(0);
        expect(subtract(3)).toBe(3);
    })

    it.skip('should throw an error if there is an undefined passed in', () => {
        expect(() => subtract(10, undefined)).toThrow();
    });
});

describe('multiply', () => {
    it('should multiply 2 positive numbers', ()=>{
        expect(multiply(2,4)).toBe(8);
    });

    it('should throw an err if one of the args is null', () => {
        expect(()=> multiply(undefined, null)).toThrow();
    });
});

describe('divide', () => {
    it('should divide 2 numbers', ()=> {
        expect(divide(8,4)).toBe(2);
    });
    
    it('should return null if you divide by zero', () => {
        expect(divide(0, 19)).toBeNull();
        expect(divide(19, 0)).toBeNull();
    });
});
