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
    var result = [indent, '<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var props = formatProps(tree.props, indent);
    var hasProps = props;
    result.push(props);

    // children
    var children = tree.children;
    var hasChildren = !isEmpty(children);
    if (hasChildren) {
        var indent2 = indent + INDENT;

        children.forEach(function(child, index) {
            if (hasProps) result.push('\n');
            if (index === 0) result.push('>');

            // text
            if (typeof child === 'string') {
                result.push('\n', indent2, child);

            // react element
            } else {
                result.push(treeToSnapshot(child, indent2, depth + 1));
            }
        });
        result.push('\n', indent, '</', type, '>');

    // no children means self-closing tag
    } else {
        // if props exist, close tag on newline
        // otherwise, close tag on same line
        result.push(hasProps ? '\n' + indent : ' ', '/>');
    }

    // add newline to the start if there are props or children
    if (hasProps || hasChildren) {
        result.unshift('\n');

        // add newline to the end if recursion hasn't happened yet
        // or element is self-closing
        if (!depth || (depth && !hasChildren)) result.push('\n');
    }

    // snapshot string
    return result.join('');
}

module.exports = treeToSnapshot;
