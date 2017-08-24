/**
 * @file Determines whether a string begins with the characters of a specified string.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module string-starts-with-x
 */

'use strict';

var startsWith = String.prototype.startsWith;
var startsWithRejectsRegex;
var startsWithHandlesInfinity;

if (startsWith) {
  try {
    /* throws if spec-compliant */
    startsWith.call('/a/', /a/);
  } catch (ignore) {
    startsWithRejectsRegex = true;
  }

  try {
    startsWithHandlesInfinity = startsWith.call('abc', 'a', Infinity) === false;
  } catch (ignore) {
    startsWithHandlesInfinity = false;
  }
}

var $startsWith;
if (startsWith && startsWithRejectsRegex && startsWithHandlesInfinity) {
  $startsWith = function _startsWith(string, searchString) {
    var args = [searchString];
    if (arguments.length > 2) {
      args[1] = arguments[2];
    }

    return startsWith.apply(string, args);
  };
} else {
  // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
  var toInteger = require('to-integer-x');
  var requireObjectCoercible = require('require-object-coercible-x');
  var toStr = require('to-string-x');
  var isRegExp = require('is-regex');
  $startsWith = function _startsWith(string, searchString) {
    var str = toStr(requireObjectCoercible(string));
    if (isRegExp(searchString)) {
      throw new TypeError('Cannot call method "startsWith" with a regex');
    }

    var searchStr = toStr(searchString);
    var position;
    if (arguments.length > 2) {
      position = arguments[2];
    }

    var start = Math.max(toInteger(position), 0);
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
 */
module.exports = $startsWith;
