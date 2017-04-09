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
        // void element
        {
            title: '<br />',
            tree: render(<br />),
        },

        // self-closing tag
        {
            title: 'empty <div>',
            tree: render(<div />),
        },

        // single attribute
        {
            title: '<link> with href',
            tree: render(<link href='/style.css' />),
        },

        // multiple attributes
        {
            title: '<link> with type and href',
            tree: render(<link type='text/css' href='/style.css' />),
        },

        // boolean attributes
        {
            title: '<fieldset> that is disabled',
            tree: render(<fieldset disabled />),
        },
        {
            title: '<input> that is checked',
            tree: render(<input checked={true} />),
        },
        {
            title: '<input> that is not checked',
            tree: render(<input checked={false} />),
        },

        // data attribute
        {
            title: '<dd> with data attribute key only',
            tree: render(<dd data-key />),
        },
        {
            title: '<dd> with data attribute key and value',
            tree: render(<dd data-key='value' />),
        },

        // undefined prop
        {
            title: '<base> with undefined prop',
            tree: render(<base prop={undefined} />),
        },

        // null prop
        {
            title: '<col> with null prop',
            tree: render(<col prop={null} />),
        },

        // number prop
        {
            title: '<input> with tabIndex',
            tree: render(<input tabIndex={1} />),
        },

        // function prop
        {
            title: '<input> with onClick',
            tree: render(<input onClick={() => {}} />),
        },

        // object prop
        {
            title: '<input> with empty style object',
            tree: render(<input style={{}} />),
        },
        {
            title: '<input> with style',
            tree: render(<input style={{ color: 'black', }} />),
        },
        {
            title: '<input> with styles',
            tree: render(<input style={{ color: 'black', fontSize: 14, }} />),
        },
        {
            title: '<input> with nested object prop',
            tree: render(<input nested={{
                level1: {
                    key1: 'value1',
                    level2: {
                        key2: 'value2',
                    },
                },
            }} />),
        },

        // array prop
        {
            title: '<input> with empty array prop',
            tree: render(<input array={[]} />),
        },
        {
            title: '<input> with array prop',
            tree: render(<input array={[1, 2, 3]} />),
        },
        {
            title: '<input> with multidimensional array prop',
            tree: render(<input multi={[[1, 2], 3, 4]} />),
        },

        // no children
        {
            title: '<head> with no children',
            tree: render(<head></head>),
        },

        // children
        {
            title: '<title> with text',
            tree: render(<title>text</title>),
        },

        // children and props
        {
            title: '<div> with text and single prop',
            tree: render(<div className='class'>text</div>),
        },
        {
            title: '<div> with text and multiple props',
            tree: render(
                <div
                    className='class'
                    style={{ fontWeight: 'bold' }}
                >
                    text
                </div>
            ),
        },

        // nested elements
        {
            title: 'nested elements',
            tree: render(
                <body>
                    <div>
                        <p>
                            text
                        </p>
                    </div>
                </body>
            ),
        },
        {
            title: '<ul> with nested <li>',
            tree: render(
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            ),
        },
        {
            title: 'nested elements and void elements',
            tree: render(
                <section>
                    <p>text</p>
                    <br />
                    <input />
                    <p><em>more text</em></p>
                    <hr />
                </section>
            ),
        },
        {
            title: 'nested elements and void elements with props',
            tree: render(
                <section className='section'>
                    <p style={{ fontFamily: 'Arial' }}>text</p>
                    <br />
                    <input type='text' value='input text' />
                    <p><em>more text</em></p>
                    <hr width='100px' height='100px' />
                </section>
            ),
        },
        {
            title: 'mixture of elements, props, and text',
            tree: render(
                <div>
                    <header style={{ textAlign: 'center', marginLeft: '2em' }}>
                        <h2 className='heading'>Heading</h2>
                    </header>
                    <hr />
                    <p>Lorem ipsum&nbps;</p>
                    <ol>
                        <li aria-label='foo'>One</li>
                    </ol>
                    <input
                        type='text'
                        value='bar'
                        onChange={() => {}}
                        readOnly
                    />
                </div>
            ),
        },

        // react element as prop
        {
            title: '<meta> with prop react element',
            tree: render(<meta prop={<area />} />),
        },
        {
            title: '<meta> with prop react element that has props',
            tree: render(<meta prop={<area className='class' />} />),
        },
        {
            title: '<meta> with prop react element that has children',
            tree: render(<meta prop={<p><i>text</i></p>} />),
        },
        {
            title: '<div> with prop react element that has props and children',
            tree: render(
                <div prop={
                    <div
                        className='class'
                        style={{ color: 'green', fontWeight: 'normal' }}
                    >
                        text
                    </div>
                } />),
        },

        // react elements not rendered to json
        {
            title: 'unrendered <p>',
            tree: <p />,
        },
        {
            title: 'unrendered <p> with props and children',
            tree: <p className='class'>children<area /></p>,
        },
    ],
};
