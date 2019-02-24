# <img src="https://github.com/ddoronin/zangetsu/raw/master/assets/Zangetsu.jpg" alt="Zangetsu (斬月, Slaying Moon)" height="80px"/>

Zangetsu (斬月, Slaying Moon) is a sword used by the character Ichigo Kurosaki in the [Bleach series](https://en.wikipedia.org/wiki/Bleach_(TV_series)).

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/zangetsu/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/zangetsu.svg?style=flat)](https://www.npmjs.com/package/zangetsu) 
[![Build Status](https://travis-ci.org/ddoronin/zangetsu.svg?branch=master)](https://travis-ci.org/ddoronin/zangetsu) 
[![Coverage Status](https://coveralls.io/repos/github/ddoronin/zangetsu/badge.svg?branch=master)](https://coveralls.io/github/ddoronin/zangetsu?branch=master)
```
$ yarn add zangetsu
```

## Mutable & Immutable namespaces
Use Immutable namespace if you need to create a completely new object (it's a use case for 99% of work). A new reference will be returned.
Mutable - if you want to modify a given object. A reference to initial object will be returned. This could be confusing, so be careful and try to use Immutable version.

Both namespaces share a single interface, so the signature of the methods should not be different.

```javascript
import { Immutable } from 'zangetsu';
...
Immutable
    // Compose a new object.
    .compose({
        hello: 'World!'
    })

    // Extend this object with foo and bar
    // if condition returns true.
    .if(hasFoo && hasBar, {
        foo: 'Foo',
        bar: 'Bar'
    })

    // Otherwise extend with foo only.
    .elseif(hasFoo, {
        foo: 'Foo'
    })
    
    // Otherwise extend with bar only.
    .elseif(hasBar, {
        bar: 'Bar'
    })
    
    // Otherwise...
    .else({
        noFooNoBar: 'NoFooNoBar'
    })
    
    // Build projections and show only true fields.
    .$({
        hello: false,
        foo: true,
        bar: true,
        noFooNoBar: true
    }).val();
```

| hasFoo \ `hasBar` | `true`                      | `false`                        |
| --------------- | --------------------------- | ------------------------------ |
| true          | { foo: 'Foo', `bar: 'Bar'` }| { foo: 'Foo' }               |
| false         | { `bar: 'Bar'` }            | { _noFooNoBar: 'NoFooNoBar'_ } |

## Example

Suppose you compose an HTTP request to upload a file. You decide to set content type based on a file extension and apply gzip for javascript and css files.

```javascript
import { Immutable } from 'zangetsu';
...
const createRequest = (payload: any, fileExt: string) => 
    Immutable
        .compose({
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