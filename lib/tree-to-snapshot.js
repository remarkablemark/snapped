'use strict';

/**
 * Module dependencies.
 */
var formatProps = require('./format-props');
var isEmpty = require('./helpers').isEmpty;
var INDENT = require('./constants').INDENT;

/**
 * Transforms React element tree to snapshot string.
 *
 * @param  {Object} tree        - The rendered React element tree.
 * @param  {String} [indent=''] - The indent (used for formatting).
 * @param  {Number} [depth=0]   - The depth of recursion.
 * @return {String}             - The snapshot.
 */
function treeToSnapshot(tree, indent, depth) {
    indent = indent || '';
    depth = depth || 0;
    var result = ['\n', indent, '<'];

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
        if (hasProps) {
            result.push('\n', indent, '/>');

        // otherwise, close tag on same line
        } else {
            result.push(' />');
        }
    }

    // snapshot string
    return result.join('');
}

/**
 * Generates snapshot from React element tree.
 *
 * @param  {Object} tree - The rendered React element tree.
 * @param  {...*}        - The optional parameters (see `treeToSnapshot`).
 * @return {String}      - The snapshot.
 */
function generateSnapshot(tree) {
    var snapshot = treeToSnapshot.apply({}, arguments);

    // multiline snapshot is surrounded by newlines
    if (!isEmpty(tree.children) || !isEmpty(tree.props)) {
        return snapshot + '\n';

    // single line snapshot (self-closing elements)
    } else {
        return snapshot.trim();
    }
}

module.exports = generateSnapshot;
