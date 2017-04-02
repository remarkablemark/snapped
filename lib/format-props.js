'use strict';

/**
 * Module dependencies.
 */
var isEmpty = require('./helpers').isEmpty;
var INDENT = require('./constants').INDENT;

/**
 * Formats props.
 *
 * @param  {Object} prop   - The prop.
 * @param  {String} indent - The indent.
 * @return {String}        - The formatted props.
 */
function formatProps(props, indent) {
    var propNames = Object.keys(props);
    if (isEmpty(propNames)) return null;

    var result = [];
    var indent2 = indent + INDENT;

    // sort the props to ensure consistent order
    propNames.sort().forEach(function(propName) {
        var propValue = props[propName];
        result.push('\n', indent2, propName, '=');

        // values other than string are wrapped in curly braces
        if (typeof propValue === 'string') {
            result.push(formatValue(propValue));
        } else {
            result.push('{', formatValue(propValue, indent2), '}');
        }
    });

    return result.join('');
}

/**
 * Formats the value.
 *
 * @param  {*}      value  - The value.
 * @param  {String} indent - The indent.
 * @return {String}        - The formatted value.
 */
function formatValue(value, indent) {
    switch (typeof value) {
        case 'object':
            if (value === null) return 'null';

            var type = value.constructor.name;
            var isArray = type === 'Array';
            var left = isArray ? '[' : '{';
            var right = isArray ? ']' : '}';
            var keys = Object.keys(value);

            // if props are empty, then render nothing
            // otherwise, render empty object or array
            if (isEmpty(keys)) return type + ' ' + left + right;

            var separator = ': ';
            var indent2 = indent + INDENT;
            var indent3 = indent2 + INDENT;
            var result = [];

            // format and add the properties
            if (!isArray) {
                keys = keys.sort();
            }
            keys.forEach(function(key) {
                result.push(
                    '\n', indent3,
                    isArray ? '' : (
                        '"' + key + '"' + separator
                    ),
                    formatValue(value[key], indent2), ','
                );
            });

            result.unshift('\n', indent2, type, ' ', left);
            result.push(
                '\n', indent2, right,
                '\n', indent
            );
            return result.join('');

        case 'string':
            return '"' + value + '"';

        case 'boolean':
        case 'number':
            return value;

        case 'function':
            return '[Function]';

        case 'undefined':
            return 'undefined';

        default:
            return '';
    }
}

module.exports = formatProps;
