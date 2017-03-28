'use strict';

/**
 * Module dependencies.
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Renders React element to tree.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {Object}                    - The rendered tree.
 */
function render(reactElement) {
    return renderer.create(reactElement).toJSON();
}

/**
 * Tests for `treeToSnapshot()`.
 */
export default {
    title: 'treeToSnapshot()',
    tests: [
        // self-closing
        {
            title: '<br />',
            tree: render(<br />),
        },
        {
            title: 'empty <div>',
            tree: render(<div />),
        },
    ],
};
