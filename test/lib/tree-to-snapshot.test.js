'use strict';

/**
 * Module dependencies.
 */
import treeToSnapshot from '../../lib/tree-to-snapshot';
import treeToSnapshotTests from '../setup/data/';
import jestSnapshots from '../setup/__snapshots__/index.test.js.snap';

/**
 * Compare Jest snapshots with `treeToSnapshot()`.
 */
describe(treeToSnapshotTests.title, () => {
    treeToSnapshotTests.tests.forEach(({ title, tree }) => {
        test(title, () => {
            expect(treeToSnapshot(tree)).toEqual(jestSnapshots[`${title} 1`]);
        });
    });
});
