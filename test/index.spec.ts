import { expect } from 'chai';
import * as api from '../src';

describe('index', () => {
    it('should define compose()', () => {
        expect(api.compose).to.be.not.undefined;
    });
});