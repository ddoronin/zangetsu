import { expect } from 'chai';
import { compose } from '../src/composer';

describe('mutable', () => {
    it('should create an object by default', () => {
        expect(compose({}).val()).to.eql({})
    });

    it('should append', () => {
        expect(
            compose({})
                .append({ foo: 'Foo' })
                .append({ bar: 'Bar' })
                .val()
        ).to.eql({ 
            foo: 'Foo',
            bar: 'Bar'
        });
    });

    it('should append conditionally if true', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(true, { bar: 'Bar' })
                .val()
        ).to.eql({ 
            foo: 'Foo',
            bar: 'Bar'
        });
    });

    it('should not append conditionally if false', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(false, { bar: 'Bar' })
                .val()
        ).to.eql({ 
            foo: 'Foo'
        });
    });

    it('should append in the else statement', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(false, { whatever: 'Whatever' })
                .else({ bar: 'Bar' })
                .val()
        ).to.eql({ 
            foo: 'Foo',
            bar: 'Bar'
        });
    });

    it('should not append in the else statement', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(true, { whatever: 'Whatever' })
                .else({ bar: 'Bar' })
                .val()
        ).to.eql({
            foo: 'Foo',
            whatever: 'Whatever'
        });
    });

    it('should append in the elseif statement', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(false, { whatever: 'Whatever' })
                .elseif(true, { bar: 'Bar' })
                .val()
        ).to.eql({
            foo: 'Foo',
            bar: 'Bar'
        });
    });

    it('should not append in the elseif statement', () => {
        expect(
            compose({ foo: 'Foo' })
                .if(true, { whatever: 'Whatever' })
                .elseif(true, { bar: 'Bar' })
                .val()
        ).to.eql({
            foo: 'Foo',
            whatever: 'Whatever'
        });
    });
});