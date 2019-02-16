export interface IComposer<A> {
    append<B>(b: B): IComposer<A | B>;

    if<B>(condition: boolean, b: B): IComposer<A | B>;

    elseif<C>(condition: boolean, c: C): IComposer<A | C>

    else<D>(d: D): IComposer<A | D>;

    val(): A;
}

export function compose<A extends {}>(a: A = {} as any, lastCondition: boolean = null): IComposer<A> {
    return {
        append<B>(b: B): IComposer<A & B> {
            return compose(Object.assign(a, b));
        },

        if<B>(condition: boolean, b: B): IComposer<A | B> {
            return compose(condition? Object.assign(a, b): a, condition);
        },

        elseif<C>(condition: boolean, c: C): IComposer<A | C> {
            return compose(lastCondition === false && condition === true? Object.assign(a, c): a, condition);
        },

        else<D>(d: D): IComposer<A | D> {
            return compose(lastCondition === false? Object.assign(a, d): a);
        },

        val(): A {
            return a;
        }
    }
}
