# <img src="https://github.com/ddoronin/zangetsu/raw/master/assets/Zangetsu.jpg" alt="Zangetsu (斬月, Slaying Moon)" height="80px"/>

Zangetsu (斬月, Slaying Moon) is a sword used by the character Ichigo Kurosaki in the [Bleach series](https://en.wikipedia.org/wiki/Bleach_(TV_series)).

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/zangetsu/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/zangetsu.svg?style=flat)](https://www.npmjs.com/package/zangetsu) 
[![Build Status](https://travis-ci.org/ddoronin/zangetsu.svg?branch=master)](https://travis-ci.org/ddoronin/zangetsu) 
[![Coverage Status](https://coveralls.io/repos/github/ddoronin/zangetsu/badge.svg?branch=master)](https://coveralls.io/github/ddoronin/zangetsu?branch=master)
```
$ yarn add zangetsu
```

## Mutable & Immutable
This library exposes two namespaces: `Mutable` and `Immutable`. 
Use `Immutable` if you need to produce a new object.
`Mutable` - to modify existing one.

```typescript
import { Immutable } from 'zangetsu';
...
let foo = {foo: 'Foo'};
let bar = {bar: 'Bar'};
let fooBar = Immutable.compose(foo).append(bar);
assert(fooBar !== foo); // different objects
```

```typescript
import { Mutable } from 'zangetsu';
...
let foo = {foo: 'Foo'};
let bar = {bar: 'Bar'};
let fooBar = Mutable.compose(foo).append(bar);
assert(fooBar === foo); // same object

console.log(foo);       // will print out { foo: 'Foo', bar: 'Bar' }
```

## Declarative Syntax
This library can extend objects with additional fields, remove fields with projection operator `$` and do it as a part of logical branching using `if`, `elseif` and `else`:
```typescript
import { Immutable } from 'zangetsu';
...
Immutable
    // compose a new object
    .compose({
        hello: 'World!'
    })

    // extend with another object
    .append({
        alice: 'Alice'
    })

    // extend if condition is satisfied
    .if(hasFoo && hasBar, {
        foo: 'Foo',
        bar: 'Bar'
    })

    // or if another condition is satisfied
    .elseif(hasFoo, {
        foo: 'Foo'
    })

    // the chain could be long and it will stay readable
    .elseif(hasBar, {
        bar: 'Bar'
    })

    .else({
        noFooNoBar: 'NoFooNoBar'
    })
    
    // build projections to filter fields
    .$({
        hello: false,
        alice: false,
        foo: true,
        bar: true,
        noFooNoBar: true
    })

    // return the result
    .val();
```

| hasFoo \ `hasBar` | `true`                      | `false`                        |
| --------------- | --------------------------- | ------------------------------ |
| true          | { foo: 'Foo', `bar: 'Bar'` }| { foo: 'Foo' }               |
| false         | { `bar: 'Bar'` }            | { _noFooNoBar: 'NoFooNoBar'_ } |

## Real Life Example

Suppose you need to compose an HTTP request to upload a file to a server. You decided to set content type based on the file extension and apply gzip only if this is javascript or css.

```typescript
import { Immutable } from 'zangetsu';
...
const createRequest = (payload: any, fileExt: string) => 
    Immutable
        .compose({
            body: { ...payload }
        }).if(fileExt === 'js', {
            contentType: 'text/javascript'
        }).elseif(fileExt === 'css', {
            contentType: 'text/css'
        }).else({
            contentType: 'application/octet-stream'
        }).if(['js', 'css'].includes(fileExt), {
            encoding: 'gzip'
        }).val();
```

## API

| Method               | Description |
| -------------------- | ------------- |
| compose(a)           | Creates a wrapper for a given object `a`. |
| append(b)            | Appends an object `b` to the context `a`. |
| if(condition, b)     | Appends a given object `b` to the context `a if and only if the condition is satisfied. |
| elseif(condition, c) | Appends a given object `c` to the context `a` if and only if the condition is satisfied and all previous conditions were falsy. |
| else(d)              | Appends a given object `d` to the context `a` if all previous conditions were falsy. |
| $(projection)        | Creates a projection of a context object `a` and returns only `true` fields. |
| val()                | Simply returns the context object `a`. |

```typescript
export interface IComposer<A> {

    append<B>(b: B): IComposer<A & B>;

    if<B>(condition: boolean, b: B): IComposer<A | (A & B)>;

    elseif<C>(condition: boolean, c: C): IComposer<A | (A & C)>

    else<D>(d: D): IComposer<A | (A & D)>;

    $(projection: {[K in keyof A]: Boolean}): IComposer<{[K in keyof A]: A[K] }>;

    val(): A;
}
```

## License
MIT