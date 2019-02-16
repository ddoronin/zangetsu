# super-object

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/super-object/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/@ddoronin/super-object.svg?style=flat)](https://www.npmjs.com/package/@ddoronin/super-object) 
[![Build Status](https://travis-ci.org/ddoronin/super-object.svg?branch=master)](https://travis-ci.org/ddoronin/super-object) 
[![Coverage Status](https://coveralls.io/repos/github/ddoronin/super-object/badge.svg?branch=master)](https://coveralls.io/github/ddoronin/super-object?branch=master)
```
$ yarn add @ddoronin/super-object
```

> It's like `Object.assign()`, but even more.

## Usage

Suppose you compose a request to upload a file. You decided to set different content types based on a file extension and apply gzip if this a javascript or css file.

```javascript
import { compose } from 'super-object';
...
function createRequest(payload: any, fileExt: string) {
    return api.compose({
        body: { ...payload }
    }).if(fileExt === '.js', {
        contentType: 'text/javascript'
    }).elseif(fileExt === '.css', {
        contentType: 'text/css'
    }).else({
        contentType: 'application/octet-stream'
    }).if(fileExt === '.js' || fileExt === '.css', {
        encoding: 'gzip'
    }).val();
}
```

## API

| method |   description |
| ------ | ------------- |
| compose\<A extends {}>(a: A = {} as any): IComposer\<A> | Creates a wrapper around a given object `a: A` that is a context object. |
| append\<B>(b: B): IComposer\<A \| B> | Appends a given object `b` to the context `A` |
| if\<B>(condition: boolean, b: B): IComposer\<A \| B> | Appends a given object `b` to the context `A` if and only if the condition is satisfied. |
| elseif\<C>(condition: boolean, c: C): IComposer\<A \| C> | Appends a given object `c` to the context `A` if and only if the condition is satisfied and a previous conditions were falsy. |
| else\<D>(d: D): IComposer\<A \| D> | Appends a given object `d` to the context `A` if all previous conditions were falsy. |
| val(): A | Simply returns the context object `A`. |

```typescript
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