import { expect } from 'chai';
import * as api from '../src';

describe('index', () => {
    it('should define compose()', () => {
        expect(api.compose).to.be.not.undefined;
    });

    it('should create js request', () => {
        function createRequest(payload: any, fileExt: string){
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

        expect(createRequest({}, '.js')).to.eql({
            body: {},
            contentType: 'text/javascript',
            encoding: 'gzip'
        });

        expect(createRequest({}, '.css')).to.eql({
            body: {},
            contentType: 'text/css',
            encoding: 'gzip'
        });

        expect(createRequest({}, '.html')).to.eql({
            body: {},
            contentType: 'application/octet-stream',
        });
    });
});