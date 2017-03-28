'use strict';

/**
 * Module dependencies.
 */
import treeToSnapshotTests from './data/';

/**
 * Generate Jest snapshots.
 */
treeToSnapshotTests.tests.forEach(({ title, tree }) => {
    test(title, () => {
        expect(tree).toMatchSnapshot();
    });
});
