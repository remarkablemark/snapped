'use strict';

/**
 * Module dependencies.
 */
var isEmpty = require('./helpers').isEmpty;
var INDENT = require('./constants').INDENT;

/**
 * Transforms rendered React element tree to snapshot string.
 *
 * @param  {Object} tree     - The shallow rendered React element tree.
 * @param  {String} [indent] - The indent to prettify the output.
 * @return {String}          - The snapshot output.
 */
function treeToSnapshot(tree, indent) {
    indent = indent || '';
    var indent2 = indent + INDENT;
    var result = ['<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var props = tree.props;
    var propsKeys = Object.keys(props);
    var hasProps = !isEmpty(propsKeys);
    if (hasProps) {
        // add newline to the start if there are props
        if (!indent) result.unshift('\n');

        // add the props
        propsKeys = propsKeys.sort();
        propsKeys.forEach(function(propKey) {
            result.push(
                '\n',
                indent2, propKey, '=', JSON.stringify(props[propKey])
            );
        });

        // close tag on newline
        result.push('\n/>');
    }

    // close tag on same line
    if (!hasProps) result.push(' />');

    // add newline to the end if there are props
    if (!indent && hasProps) result.push('\n');

    // snapshot string
    return result.join('');
}

module.exports = treeToSnapshot;
