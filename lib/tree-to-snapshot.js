'use strict';

/**
 * Module dependencies.
 */
var formatProps = require('./format-props');
var isEmpty = require('./helpers').isEmpty;
var INDENT = require('./constants').INDENT;

/**
 * Transforms rendered React element tree to snapshot string.
 *
 * @param  {Object} tree        - The shallow rendered React element tree.
 * @param  {String} [indent=''] - The indent to prettify the output.
 * @param  {Number} [depth=0]   - The depth of recursion.
 * @return {String}             - The snapshot output.
 */
function treeToSnapshot(tree, indent, depth) {
    indent = indent || '';
    depth = depth || 0;
    var result = ['<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var formattedProps = formatProps(tree.props, indent);
    var hasProps = Boolean(formattedProps);
    result.push(formattedProps);

    // children
    var children = tree.children;
    var hasChildren = !isEmpty(children);
    if (hasChildren) {
        children.forEach(function(child) {
            if (hasProps) result.push('\n');
            result.push(indent, '>');

            // text
            if (typeof child === 'string') {
                result.push('\n', indent, INDENT, child);

            // react element
            } else {
                result.push(treeToSnapshot(child, indent));
            }
        });
        result.push('\n', indent, '</', type, '>');

    // no children means self-closing tag
    } else {
        // if props exist, close tag on newline
        // otherwise, close tag on same line
        result.push(hasProps ? '\n' + indent : ' ', '/>');
    }

    // add newline to the start and end if there are props
    if (hasProps || hasChildren) {
        result.unshift('\n');
        result.push('\n');
    }

    // snapshot string
    return result.join('');
}

module.exports = treeToSnapshot;
