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
        // void element (self-closing tag)
        {
            title: '<br />',
            tree: render(<br />),
        },
        {
            title: 'empty <div>',
            tree: render(<div />),
        },

        // void element with single attribute
        {
            title: '<link> with href',
            tree: render(<link href='/style.css' />),
        },

        // void element with multiple attributes
        {
            title: '<link> with type and href',
            tree: render(<link type='text/css' href='/style.css' />),
        },

        // void element with boolean attributes
        {
            title: '<input> that is checked',
            tree: render(<input checked />),
        },
        {
            title: '<input> that is not checked',
            tree: render(<input checked={false} />),
        },

        // void element with function prop
        {
            title: '<input> with onClick',
            tree: render(<input onClick={() => {}} />),
        },

        // void element with object prop
        {
            title: '<input> with style',
            tree: render(<input style={{ color: 'black', }} />),
        },
        {
            title: '<input> with styles',
            tree: render(<input style={{ color: 'black', fontSize: 14, }} />),
        },
    ],
};
