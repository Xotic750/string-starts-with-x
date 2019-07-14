/**
 * @file Determines whether a string begins with the characters of a specified string.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module string-starts-with-x
 */

const nativeStartsWith = typeof String.prototype.startsWith === 'function' && String.prototype.startsWith;

let isWorking;

if (nativeStartsWith) {
  const attempt = require('attempt-x');
  let res = attempt.call('/a/', nativeStartsWith, /a/);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt.call('abc', nativeStartsWith, 'a', Infinity);
    isWorking = res.threw === false && res.value === false;
  }

  if (isWorking) {
    res = attempt.call(123, nativeStartsWith, '1');
    isWorking = res.threw === false && res.value === true;
  }

  if (isWorking) {
    // eslint-disable-next-line no-useless-call
    res = attempt.call(null, nativeStartsWith, 'n');
    isWorking = res.threw;
  }
}

let $startsWith;

if (isWorking) {
  $startsWith = function _startsWith(string, searchString) {
    const args = [searchString];

    if (arguments.length > 2) {
      args[1] = arguments[2];
    }

    return nativeStartsWith.apply(string, args);
  };
} else {
  // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
  const toInteger = require('to-integer-x');
  const requireObjectCoercible = require('require-object-coercible-x');
  const toStr = require('to-string-x');
  const isRegExp = require('is-regexp-x');
  $startsWith = function _startsWith(string, searchString) {
    const str = toStr(requireObjectCoercible(string));

    if (isRegExp(searchString)) {
      throw new TypeError('Cannot call method "startsWith" with a regex');
    }

    const searchStr = toStr(searchString);
    const position = arguments.length > 2 ? toInteger(arguments[2]) : 0;
    const start = position > 0 ? position : 0;

    return str.slice(start, start + searchStr.length) === searchStr;
  };
}

/**
 * This method determines whether a string begins with the characters of a
 * specified string, returning true or false as appropriate.
 *
 * @param {string} string - The string to be search.
 * @throws {TypeError} If string is null or undefined.
 * @param {string} searchString - The characters to be searched for at the start
 *  of this string.
 * @throws {TypeError} If searchString is a RegExp.
 * @param {number} [position] -The position in this string at which to begin
 *  searching for searchString; defaults to 0.
 * @returns {boolean} `true` if the given characters are found at the beginning
 *  of the string; otherwise, `false`.
 * @example
 * var strinStartsWith = require('string-starts-with-x');
 *
 * var str = 'To be, or not to be, that is the question.';
 *
 * startsWith(str, 'To be'); // true
 * startsWith(str, 'not to be'); // false
 * startsWith(str, 'not to be', 10); // true
 */
module.exports = $startsWith;