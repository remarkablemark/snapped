'use strict';

/**
 * Module dependencies.
 */
import index from '../../index';

/**
 * Index.
 */
describe('index', () => {
    test('exports the tree to snapshot module', () => {
        expect(index).toEqual(require('../../lib/tree-to-snapshot'));
    });
});
