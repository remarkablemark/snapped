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
    var result = ['<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var hasProps = formatProps(
        tree.props,
        result,
        depth,
        indent
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
 * @param  {Object}  props  - The props.
 * @param  {Array}   result - The result.
 * @param  {Number}  depth  - The depth of recursion.
 * @param  {String}  indent - The indent.
 * @return {Boolean}        - Whether props have been formatted.
 */
function formatProps(props, result, depth, indent) {
    var propsKeys = Object.keys(props);
    var hasProps = !isEmpty(propsKeys);

    if (hasProps) {
        // add newline to the start if there are props
        if (!depth) result.unshift('\n');

        var indent2 = indent + INDENT;
        var indent3 = indent2 + INDENT;

        // add the props
        propsKeys = propsKeys.sort();
        propsKeys.forEach(function(propKey) {
            result.push('\n', indent2, propKey, '=');

            var propValue = props[propKey];
            switch (typeof propValue) {
                case 'string':
                    result.push(JSON.stringify(propValue));
                    break;

                case 'boolean':
                    result.push('{', propValue, '}');
                    break;

                case 'function':
                    result.push('{[Function]}');
                    break;

                case 'object':
                    result.push(
                        '{', '\n', indent3, 'Object ',
                        // format json properly and
                        // add trailing comma to last property
                        JSON.stringify(
                            propValue, null, indent3 + INDENT
                        ).replace(/\n\s*}$/, ',\n' + indent3 + '}'),
                        '\n', indent2, '}'
                    );
                    break;
            }
        });

        // close tag on newline
        result.push('\n/>');
    }

    return hasProps;
}

module.exports = treeToSnapshot;
