# template-object-properties

The template-object module provides a higher order function which is used for object property templating.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install template-object-properties.

```bash
npm -i template-object-properties
```

## Usage

```javascript
const template = require('template-object-properties');

const compile = template({
    name: '${firstName} ${lastName}'
    age: '${age}',
    married: '${married}',
    hobby: '${hobbies[2]}',
    street: '${address.street}'
});

const result = compile({
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    married: false,
    hobbies: ['Fishing', 'Hiking', 'Coding'],
    address: {
        street: '1234 Street Rd'
    }
});

console.log(result);
{
    name: 'John Doe'
    age: 25,
    married: false,
    hobby: 'Coding',
    street: '1234 Street Rd'
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)