'use strict';

/**
 * Module dependencies.
 */
var isValidElement = require('react').isValidElement;
var isEmpty = require('./helpers').isEmpty;
var constants = require('./constants');
var INDENT = constants.INDENT;
var NEWLINE = constants.NEWLINE;

/**
 * Transforms React element tree to snapshot string.
 *
 * @param  {Object} tree        - The rendered React element tree.
 * @param  {String} [indent=''] - The indent is used for formatting.
 * @param  {Number} [depth=0]   - The depth of recursion.
 * @return {String}             - The snapshot.
 */
function treeToSnapshot(tree, indent, depth) {
    indent = indent || '';
    depth = depth || 0;
    var result = [NEWLINE, indent, '<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // props
    var props = formatProps(tree.props, indent);
    var hasProps = Boolean(props);
    if (hasProps) result.push(props);

    // children
    var children = tree.children || tree.props.children;
    var hasChildren = !isEmpty(children);

    if (hasChildren) {
        var indent2 = indent + INDENT;
        if (children.constructor !== Array) {
            children = [children];
        }

        children.forEach(function(child, index) {
            // after first child
            if (!index) {
                if (hasProps) result.push(NEWLINE, indent);
                result.push('>');
            }

            // text
            if (typeof child === 'string') {
                result.push(NEWLINE, indent2, child);

            // react element
            } else {
                result.push(treeToSnapshot(child, indent2, depth + 1));
            }
        });
        result.push(NEWLINE, indent, '</', type, '>');

    // no children means self-closing tag
    } else {
        // if props exist, close tag on newline
        if (hasProps) {
            result.push(NEWLINE, indent, '/>');

        // otherwise, close tag on same line
        } else {
            result.push(' />');
        }
    }

    // snapshot string
    return result.join('');
}

/**
 * Formats props.
 *
 * @param  {Object} prop   - The prop.
 * @param  {String} indent - The indent.
 * @return {String}        - The formatted props.
 */
function formatProps(props, indent) {
    var propNames = Object.keys(props);
    if (isEmpty(propNames)) return '';

    var result = [];
    var indent2 = indent + INDENT;

    // sort the props to ensure consistent order
    propNames.sort().forEach(function(propName) {
        if (propName === 'children') return;

        var propValue = props[propName];
        result.push(NEWLINE, indent2, propName, '=');

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

            // if react element, then transform to snapshot
            if (isValidElement(value)) {
                result.push(
                    generateSnapshot(value, indent + INDENT),
                    // no indent for self-closing tags
                    isEmpty(value.props) ? '' : indent
                );
                break;
            }

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
                        NEWLINE, indent3,
                        formatValue(item, indent2, depth + 1)
                    );
                });

            // otherwise, iterate through object
            } else {
                keys = keys.sort();
                keys.forEach(function(key) {
                    result.push(
                        NEWLINE, indent3, '"', key, '"', separator,
                        formatValue(value[key], indent2, depth + 1)
                    );
                });
            }

            // close the brace or bracket
            // and add dangling comma if nested
            result.unshift(type, ' ', left);
            result.push(NEWLINE, indent2, right, depth ? ',' : '');
            if (!depth) {
                result.unshift(NEWLINE, indent2);
                result.push(NEWLINE, indent);
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
        return snapshot + NEWLINE;

    // single line snapshot (self-closing elements)
    } else {
        return snapshot.trim();
    }
}

module.exports = generateSnapshot;
