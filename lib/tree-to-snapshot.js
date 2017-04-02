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
    var props = formatValue(tree.props, indent);
    var hasProps = Boolean(props);

    // if props exist, close tag on newline
    // otherwise, close tag on same line
    result.push(props, hasProps ? '\n/>' : ' />');

    // add newline to the start and end if there are props
    if (!depth && hasProps) {
        result.unshift('\n');
        result.push('\n');
    }

    // snapshot string
    return result.join('');
}

/**
 * Formats the value.
 *
 * @param  {*}      value     - The value.
 * @param  {String} indent    - The indent.
 * @param  {Number} [depth=0] - The depth of recursion.
 * @return {String}           - The formatted output.
 */
function formatValue(value, indent, depth) {
    depth = depth || 0;
    var isProp = depth === 0;

    switch (typeof value) {
        case 'object':
            if (value === null) return 'null';

            var keys = Object.keys(value);
            var hasKeys = !isEmpty(keys);

            if (!hasKeys) {
                // if props are empty, then render nothing
                // otherwise, render empty object
                return isProp ? '' : '{Object {}}';
            }

            var separator = isProp ? '=' : ': ';
            var indent2 = indent + INDENT;
            var indent3 = indent2 + INDENT;
            var result = [];

            // format and add the properties
            keys = keys.sort();
            keys.forEach(function(key) {
                result.push(
                    '\n', isProp ? indent2 : indent3,
                    isProp ? key : '"' + key + '"', separator,
                    formatValue(value[key], indent2, depth + 1),
                    isProp ? '' : ','
                );
            });

            if (depth > 0) {
                result.unshift('{\n', indent2, value.constructor.name, ' {');
                result.push(
                    '\n', indent2, '}',
                    '\n', indent, '}'
                );
            }
            return result.join('');

        case 'string':
            return '"' + value + '"';

        case 'number':
            return '{' + value + '}';

        case 'boolean':
            return '{' + value + '}';

        case 'function':
            return depth < 2 ? '{[Function]}' : '[Function]';

        case 'undefined':
            return 'undefined';

        default:
            return '';
    }
}

module.exports = treeToSnapshot;
