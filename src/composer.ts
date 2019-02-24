export interface IComposer<A> {

    append<B>(b: B): IComposer<A & B>;

    if<B>(condition: boolean, b: B): IComposer<A | (A & B)>;

    elseif<C>(condition: boolean, c: C): IComposer<A | (A & C)>

    else<D>(d: D): IComposer<A | (A & D)>;

    $(projection: {[K in keyof A]: Boolean}): IComposer<{[K in keyof A]: A[K] }>;

    val(): A;
}

export function compose<A extends {}>(a: A, lastCondition: boolean = null): IComposer<A> {
    return {
        /**
         * Extends A with B.
         * @param {Object} b 
         */
        append<B>(b: B): IComposer<A & B> {
            return compose(Object.assign(a, b));
        },

        /**
         * Extends A with B if condition is satisfied.
         * @param {Boolean} condition 
         * @param {Object} b 
         */
        if<B>(condition: boolean, b: B): IComposer<A | (A & B)> {
            return compose(condition? Object.assign(a, b): a, condition);
        },

        /**
         * Extends A with C if previous condition returns false and 
         * the current condition is satisfied.
         * @param {Boolean} condition 
         * @param {Object} c 
         */
        elseif<C>(condition: boolean, c: C): IComposer<A | (A & C)> {
            if (lastCondition === false) {
                return compose(condition? Object.assign(a, c): a, condition);
            }
            return compose(a);
        },

        /**
         * Extends A with D if all previous conditions were falsy.
         * @param {Object} d 
         */
        else<D>(d: D): IComposer<A | (A & D)> {
            return compose(lastCondition === false? Object.assign(a, d): a);
        },

        /**
         * Builds projection of a given object properties.
         * @param {Object} projection - a projection object e.g. {prop1: true, prop2: false, ...etc}
         */
        $(projection: {[K in keyof A]: Boolean}): IComposer<{[K in keyof A]: A[K] }> {
            for(const key in projection) {
                if (!projection[key]) {
                    delete a[key];
                }
            }
            return compose(a);
        },

        /**
         * Returns a given object after all mutations.
         */
        val(): A {
            return a;
        }
    }
}
