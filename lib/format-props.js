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
 * @param  {*}      value     - The value.
 * @param  {String} indent    - The indent.
 * @param  {Number} [depth=0] - The depth of recursion.
 * @return {String}           - The formatted value.
 */
function formatValue(value, indent, depth) {
    depth = depth || 0;
    var isObject = false;
    var result = [];

    switch (typeof value) {
        case 'object':
            if (value === null) return 'null';
            isObject = true;

            var type = value.constructor.name;
            var isArray = type === 'Array';
            var left = isArray ? '[' : '{';
            var right = isArray ? ']' : '}';
            var keys = Object.keys(value);

            // if empty, then render `Object {}` or `Array []`
            if (isEmpty(keys)) {
                result.push(type, ' ', left, right);
                break;
            }

            var separator = ': ';
            var indent2 = indent + INDENT;
            var indent3 = indent2 + INDENT;

            // iterate through array
            if (isArray) {
                value.forEach(function(item) {
                    result.push(
                        '\n', indent3,
                        formatValue(item, indent2, depth + 1)
                    );
                });

            // otherwise, iterate through object
            } else {
                keys = keys.sort();
                keys.forEach(function(key) {
                    result.push(
                        '\n', indent3, '"', key, '"', separator,
                        formatValue(value[key], indent2, depth + 1)
                    );
                });
            }

            // close the brace or bracket
            // and add dangling comma if nested
            result.unshift(type, ' ', left);
            result.push('\n', indent2, right, depth ? ',' : '');
            if (!depth) {
                result.unshift('\n', indent2);
                result.push('\n', indent);
            }
            break;

        case 'string':
            result.push('"', value, '"');
            break;

        case 'boolean':
        case 'number':
            result.push(value);
            break;

        case 'function':
            result.push('[Function]');
            break;

        case 'undefined':
            result.push('undefined');
            break;
    }

    // add dangling comma for values inside object or array
    if (!isObject && depth) result.push(',');

    return result.join('');
}

module.exports = formatProps;
