'use strict';

/**
 * Checks if value is empty.
 *
 * @param  {*}       value - The value.
 * @return {Boolean}
 */
function isEmpty(value) {
    // falsey values are empty
    if (!value) return true;

    // array value
    if (value instanceof Array) return !value.length;

    // object value
    if (value instanceof Object) return !Object.keys(value).length;

    // otherwise not empty
    return false;
}

/**
 * Export helpers.
 */
module.exports = {
    isEmpty: isEmpty
};
