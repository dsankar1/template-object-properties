const template = require('../index');

test('String Interpolation', () => {
    const compile = template({ string: '${greeting}' });
    const compiled = compile({ greeting: 'Hello World' });

    expect(compiled.string).toBe('Hello World');
});

test('Prefix String Interpolation', () => {
    const compile = template({ string: 'Name: ${name}' });
    const compiled = compile({ name: 'Adam' });

    expect(compiled.string).toBe('Name: Adam');
});

test('Prefix Number Interpolation', () => {
    const compile = template({ string: 'Age: ${age}' });
    const compiled = compile({ age: 25 });

    expect(compiled.string).toBe('Age: 25');
});

test('Prefix Boolean Interpolation', () => {
    const compile = template({ string: 'Married: ${married}' });
    const compiled = compile({ married: false });

    expect(compiled.string).toBe('Married: false');
});

test('Number Interpolation', () => {
    const compile = template({ number: '${ten}' });
    const compiled = compile({ ten: 10 });

    expect(compiled.number).toBe(10);
});

test('Boolean Interpolation', () => {
    const compile = template({ boolean: '${disabled}' });
    const compiled = compile({ disabled: true });

    expect(compiled.boolean).toBe(true);
});

test('Invalid Query', () => {
    const compile = template({ string: '${-_][]}' });
    const compiled = compile({ greeting: 'Hello World' });

    expect(compiled.string).toBe(undefined);
});

test('Empty Query', () => {
    const compile = template({ string: '${}' });
    const compiled = compile({ greeting: 'Hello World' });

    expect(compiled.string).toBe(undefined);
});

test('Object Interpolation', () => {
    const person = {
        name: 'Bob',
        age: 25
    };
    const compile = template({
        object: '${person}',
        validKey: '${person.name}',
        invalidKey: '${person.weight}'
    });
    const compiled = compile({ person });

    expect(compiled.object).toBe(person);
    expect(compiled.validKey).toBe('Bob');
    expect(compiled.invalidKey).toBe(undefined);
});

test('Array Interpolation', () => {
    const names = ['Bob', 'Joe', 'Jane'];
    const compile = template({
        array: '${names}',
        validIndex: '${names[2]}',
        invalidIndex: '${names[3]}'
    });
    const compiled = compile({ names });

    expect(compiled.array).toBe(names);
    expect(compiled.validIndex).toBe('Jane');
    expect(compiled.invalidIndex).toBe(undefined);
});

test('Object Array Interpolation', () => {
    const people = [
        {
            name: 'Bob',
            age: 24
        },
        {
            name: 'Joe',
            age: 25
        },
        {
            name: 'Amy',
            age: 26
        }
    ];
    const compile = template({
        array: '${people}',
        bobName: '${people[0].name}',
        amyAge: '${people[2].age}',
        invalidIndex: '${people[3]}'
    });
    const compiled = compile({ people });

    expect(compiled.array).toBe(people);
    expect(compiled.bobName).toBe('Bob');
    expect(compiled.amyAge).toBe(26);
    expect(compiled.invalidIndex).toBe(undefined);
});

test('Function Interpolation', () => {
    const greet = (name = 'World') => `Hello ${name}`;
    const compile = template({ function: '${greet}' });
    const compiled = compile({ greet });

    expect(compiled.function).toBe(greet);
    expect(compiled.function('Steve')).toBe('Hello Steve');
});