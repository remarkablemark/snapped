'use strict';

/**
 * Module dependencies.
 */
var isEmpty = require('./helpers').isEmpty;
var INDENT = require('./constants').INDENT;

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

            var type = value.constructor.name;
            var isArray = type === 'Array';
            var left = isArray ? '[' : '{';
            var right = isArray ? ']' : '}';
            var keys = Object.keys(value);

            if (isEmpty(keys)) {
                // if props are empty, then render nothing
                // otherwise, render empty object or array
                return isProp ? '' : ['{', type, ' ', left, right, '}'].join('');
            }

            var separator = isProp ? '=' : ': ';
            var indent2 = indent + INDENT;
            var indent3 = indent2 + INDENT;
            var result = [];

            // format and add the properties
            if (!isArray) {
                keys = keys.sort();
            }
            keys.forEach(function(key) {
                result.push(
                    '\n', isProp ? indent2 : indent3,
                    isArray ? '' : (
                        isProp ? key + separator : '"' + key + '"' + separator
                    ),
                    formatValue(value[key], indent2, depth + 1),
                    isProp ? '' : ','
                );
            });

            if (depth > 0) {
                result.unshift('{\n', indent2, type, ' ', left);
                result.push(
                    '\n', indent2, right,
                    '\n', indent, '}'
                );
            }
            return result.join('');

        case 'string':
            return '"' + value + '"';

        case 'number':
            return depth < 2 ? '{' + value + '}' : value;

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

module.exports = formatValue;
