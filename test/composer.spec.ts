import { expect } from 'chai';
import { compose } from '../src/composer';

describe('composer', () => {
    it('should create an object by default', () => {
        expect(compose({}).val()).to.eql({})
    });

    it('should mutate an object that is passed in', () => {
        let o = { foo: 'foo' };
        compose(o).append({ bar: 'Bar' });
        expect(o).to.eql({ foo: 'foo', bar: 'Bar' });
    });

    it('should create a new object if {} is passed in', () => {
        let o = { foo: 'foo' };
        const res = compose({}).append(o).append({ bar: 'Bar' }).val();
        expect(o).to.eql({ foo: 'foo' });
        expect(res).to.eql({ foo: 'foo', bar: 'Bar' });
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

    it('should calculate projections with mutation', () => {
        let fooBar = { 
            foo: 'Foo' ,
            bar: 'Bar',
            whatever: 'Whatever'
        };

        compose(fooBar).$({
            foo: true, 
            bar: false, 
            whatever: false
        });

        expect(fooBar).to.eql({
            foo: 'Foo'
        });
    });

    it('should calculate immutable projections', () => {
        const fooBar = { 
            foo: 'Foo' ,
            bar: 'Bar',
            whatever: 'Whatever'
        };

        expect(
            compose({})
                .append(fooBar)
                .$({
                    foo: false, 
                    bar: true, 
                    whatever: false
                })
                .val()
        ).to.eql({
            bar: 'Bar'
        });

        expect(fooBar).to.eql({
            foo: 'Foo' ,
            bar: 'Bar',
            whatever: 'Whatever'
        });
    });
});