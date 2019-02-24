import { expect } from 'chai';
import { Mutable, Immutable } from '../src';

describe('index', () => {
    describe('Mutable', () => {
        it('should define compose()', () => {
            expect(Mutable.compose).to.be.not.undefined;
        });

        it('should create a request', () => {
            function createRequest(request: {}, fileExt: string){
                return Mutable.compose(request)
                    .if(fileExt === '.js', {
                        contentType: 'text/javascript'
                    }).elseif(fileExt === '.css', {
                        contentType: 'text/css'
                    }).else({
                        contentType: 'application/octet-stream'
                    }).if(fileExt === '.js' || fileExt === '.css', {
                        encoding: 'gzip'
                    }).$({
                        body: true,
                        contentType: true,
                        encoding: true
                    }).val();
            }
    
            let req1 = { body: { } };
            let res1 = createRequest(req1, '.js');
            expect(res1 === req1).to.be.true;
            expect(req1).to.eql({
                body: {},
                contentType: 'text/javascript',
                encoding: 'gzip'
            });

            let req2 = { body: { } };
            let res2 = createRequest(req2, '.css');
            expect(res2 === req2).to.be.true;
            expect(req2).to.eql({
                body: {},
                contentType: 'text/css',
                encoding: 'gzip'
            });
    
            let req3 = { body: { } };
            let res3 = createRequest(req3, '.html');
            expect(res3 === req3).to.be.true;
            expect(req3).to.eql({
                body: {},
                contentType: 'application/octet-stream',
            });
        });
    });

    describe('Immutable', () => {
        it('should define compose()', () => {
            expect(Immutable.compose).to.be.not.undefined;
        });

        it('should create a request', () => {
            function createRequest(request: {}, fileExt: string){
                return Immutable.compose(request)
                    .if(fileExt === '.js', {
                        contentType: 'text/javascript'
                    }).elseif(fileExt === '.css', {
                        contentType: 'text/css'
                    }).else({
                        contentType: 'application/octet-stream'
                    }).if(fileExt === '.js' || fileExt === '.css', {
                        encoding: 'gzip'
                    }).$({
                        body: true,
                        contentType: true,
                        encoding: true
                    }).val();
            }
    
            let req1 = { body: { } };
            let res1 = createRequest(req1, '.js');
            expect(req1).to.eql({
                body: {},
            });
            expect(res1).to.eql({
                body: {},
                contentType: 'text/javascript',
                encoding: 'gzip'
            });

            let req2 = { body: { } };
            let res2 = createRequest(req2, '.css');
            expect(req2).to.eql({
                body: {},
            });
            expect(res2).to.eql({
                body: {},
                contentType: 'text/css',
                encoding: 'gzip'
            });
    
            let req3 = { body: { } };
            let res3 = createRequest(req3, '.html');
            expect(req3).to.eql({
                body: {},
            });
            expect(res3).to.eql({
                body: {},
                contentType: 'application/octet-stream',
            });
        });
    });
});