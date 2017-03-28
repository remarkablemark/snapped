'use strict';

/**
 * Transforms rendered React element tree to snapshot string.
 *
 * @param  {Object} tree - The shallow rendered React element tree.
 * @return {String}      - The snapshot output.
 */
function treeToSnapshot(tree) {
    var result = ['<'];

    // type
    var type = tree.type;
    result.push(typeof type === 'string' ? type : type.name);

    // self-closing tag
    result.push(' />');

    // snapshot string
    return result.join('');
}

module.exports = treeToSnapshot;
