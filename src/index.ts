import { compose as _compose, IComposer } from './composer';

export namespace Mutable {
    export function compose<A extends {}>(a: A): IComposer<A> {
        return _compose(a);
    }
}

export namespace Immutable {
    export function compose<A extends {}>(a: A): IComposer<A> {
        return _compose({}).append(a);
    }
}
