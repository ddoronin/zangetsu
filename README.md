# <img src="https://github.com/ddoronin/super-object/blob/master/assets/Zangetsu.jpg" alt="Zangetsu (斬月, Slaying Moon)" height="80px"/>

Zangetsu (斬月, Slaying Moon) is a sword used by the character Ichigo Kurosaki in the [Bleach series](https://en.wikipedia.org/wiki/Bleach_(TV_series)).

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/zangetsu/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/zangetsu.svg?style=flat)](https://www.npmjs.com/package/zangetsu) 
[![Build Status](https://travis-ci.org/ddoronin/zangetsu.svg?branch=master)](https://travis-ci.org/ddoronin/zangetsu) 
[![Coverage Status](https://coveralls.io/repos/github/ddoronin/zangetsu/badge.svg?branch=master)](https://coveralls.io/github/ddoronin/zangetsu?branch=master)
```
$ yarn add zangetsu
```

## compose
> It's like `Object.assign()`, but even more.

```javascript
import { compose } from 'zangetsu';
...
compose({})
    .if(hasFoo && hasBar, {
        foo: 'Foo',
        bar: 'Bar'
    }).elseif(hasFoo, {
        foo: 'Foo'
    }).elseif(hasBar, {
        bar: 'Bar'
    }).else({
        noFooNoBar: 'NoFooNoBar'
    }).val();
```

| hasFoo \ hasBar | `true`                      | `false`                        |
| --------------- | --------------------------- | ------------------------------ |
| `true`          | `{ foo: 'Foo', bar: 'Bar' }`| `{ foo: 'Foo' }`               |
| `false`         | `{ bar: 'Bar' }`            | `{ noFooNoBar: 'NoFooNoBar' }` |

## Example

Suppose you compose an HTTP request to upload a file. You decide to set content type based on a file extension and apply gzip for javascript and css files.

```javascript
import { compose } from 'zangetsu';
...
const createRequest = (payload: any, fileExt: string) => 
    compose({
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
```

## API

| method |   description |
| ------ | ------------- |
| compose\<A extends {}>(a: A = {} as any): IComposer\<A> | Creates a wrapper around a given object `a: A` that is a context object. |
| append\<B>(b: B): IComposer\<A \| B> | Appends a given object `b` to the context `A` |
| if\<B>(condition: boolean, b: B): IComposer\<A \| B> | Appends a given object `b` to the context `A` if and only if the condition is satisfied. |
| elseif\<C>(condition: boolean, c: C): IComposer\<A \| C> | Appends a given object `c` to the context `A` if and only if the condition is satisfied and all previous conditions were falsy. |
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