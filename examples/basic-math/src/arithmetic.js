export const add = (a,b) => {
    if(typeof a ==='string') a = Number(a);
    if(typeof b === 'string') b = Number(b);

    if(isNaN(b) || isNaN(a)) throw new Error('a and b must be a number and not a word')
    return a + b;
};

export const subtract = (a = 0, b = 0) => {
    if(typeof a === 'undefined' || typeof b === 'undefined') throw new Error('a and be cannot be undefined y\'all');
    
    if(Array.isArray(a)){
        a = a.reduce((acc, currVal) => { return acc - currVal});
    }
    return a - b;
};

export const multiply = (a,b) => {
    if(typeof a !== 'number' || typeof b !== "number") throw new Error('please just use a NUMBER!');
    return a * b;
};

export const divide = (a,b) => {
    const result = a / b;

    console.log('divide:', result)

    if(result === 0 || result === Infinity){
        return null;
    }

    return a / b;
};
