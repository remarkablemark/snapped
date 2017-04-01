'use strict';

/**
 * Module dependencies.
 */
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
    var indent2 = indent + INDENT;
    var result = ['<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var hasProps = formatProps(
        tree.props,
        result,
        depth,
        indent,
        indent2
    );

    // close tag on same line
    if (!hasProps) result.push(' />');

    // add newline to the end if there are props
    if (!depth && hasProps) result.push('\n');

    // snapshot string
    return result.join('');
}

/**
 * Formats the props for the snapshot.
 *
 * @param  {Object}  props    - The props.
 * @param  {Array}   result   - The result.
 * @param  {Number}  depth    - The depth of recursion.
 * @param  {String}  indent   - The single indent.
 * @param  {String}  indent2  - The double indent.
 * @return {Boolean}          - Whether props have been formatted.
 */
function formatProps(props, result, depth, indent, indent2) {
    var propsKeys = Object.keys(props);
    var hasProps = !isEmpty(propsKeys);

    if (hasProps) {
        // add newline to the start if there are props
        if (!depth) result.unshift('\n');

        // add the props
        propsKeys = propsKeys.sort();
        propsKeys.forEach(function(propKey) {
            result.push('\n', indent2, propKey, '=');
            var propValue = props[propKey];
            if (typeof propValue === 'string') {
                result.push(JSON.stringify(propValue));
            } else {
                result.push('{', propValue, '}');
            }
        });

        // close tag on newline
        result.push('\n/>');
    }

    return hasProps;
}

module.exports = treeToSnapshot;
