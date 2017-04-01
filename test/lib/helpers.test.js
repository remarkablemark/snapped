'use strict';

/**
 * Module dependencies.
 */
import { isEmpty } from '../../lib/helpers';

/**
 * Tests for `isEmpty()` helper.
 */
describe('isEmpty()', () => {
    test('returns true for falsey values', () => {
        expect(isEmpty(false)).toEqual(true);
        expect(isEmpty(0)).toEqual(true);
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty(undefined)).toEqual(true);
    });

    test('returns true for empty array', () => {
        expect(isEmpty([])).toEqual(true);
    });

    test('returns true for empty object', () => {
        expect(isEmpty({})).toEqual(true);
    });

    test('returns false for non-empty array', () => {
        expect(isEmpty([1])).toEqual(false);
    });

    test('returns false for non-empty object', () => {
        expect(isEmpty({ a:1 })).toEqual(false);
    });

    test('returns false for every other truthy value', () => {
        expect(isEmpty(true)).toEqual(false);
        expect(isEmpty(1)).toEqual(false);
        expect(isEmpty('a')).toEqual(false);
    });
});
