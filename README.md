# super-object

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/super-object/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/@ddoronin/super-object.svg?style=flat)](https://www.npmjs.com/package/@ddoronin/super-object) 
[![Build Status](https://travis-ci.org/ddoronin/super-object.svg?branch=master)](https://travis-ci.org/ddoronin/super-object) 
[![Coverage Status](https://coveralls.io/repos/github/ddoronin/super-object/badge.svg?branch=master)](https://coveralls.io/github/ddoronin/super-object?branch=master)
```
$ yarn add super-object
```
## Usage

```javascript
import { compose } from 'super-object';

compose()
    .append({
        foo: 'Foo',
        bar: 'Bar'
    }).if(hasFooBar, {
        fooBar: 'FooBar'
    }).else({
        noFooBar: 'NoFooBar'
    }).val()
```
Output:
```javascript
const hasFooBar = true;
... 
{
    foo: 'Foo',
    bar: 'Bar',
    fooBar: 'FooBar'
}
```

```javascript
const hasFooBar = false;
... 
{
    foo: 'Foo',
    bar: 'Bar',
    noFooBar: 'NoFooBar'
}
```

## API
```typescript
import { compose } from 'super-object';

export interface IComposer<A> {
    append<B>(b: B): IComposer<A | B>;
    if<B>(condition: boolean, b: B): IComposer<A | B>;
    elseif<C>(condition: boolean, c: C): IComposer<A | C>
    else<D>(d: D): IComposer<A | D>;
    val(): A;
}
```

## License
MIT