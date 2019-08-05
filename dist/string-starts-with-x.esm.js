import attempt from 'attempt-x';
import toInteger from 'to-integer-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toStr from 'to-string-x';
import isRegExp from 'is-regexp-x';
import toBoolean from 'to-boolean-x';
var ERR_MSG = 'Cannot call method "startsWith" with a regex';
var sw = ERR_MSG.startsWith;
var nativeStartsWith = typeof sw === 'function' && sw;

var test1 = function test1() {
  return attempt.call('/a/', nativeStartsWith, /a/).threw;
};

var test2 = function test2() {
  var res = attempt.call('abc', nativeStartsWith, 'a', 1 / 0);
  return res.threw === false && res.value === false;
};

var test3 = function test3() {
  var res = attempt.call(123, nativeStartsWith, '1');
  return res.threw === false && res.value === true;
};

var test4 = function test4() {
  return attempt.call(null, nativeStartsWith, 'n').threw;
};

var isWorking = toBoolean(nativeStartsWith) && test1() && test2() && test3() && test4();

var patchedStartsWith = function startsWith(string, searchString) {
  var str = requireObjectCoercible(string);

  if (isRegExp(searchString)) {
    throw new TypeError(ERR_MSG);
  }

  var args = [searchString];

  if (arguments.length > 2) {
    /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
    args[1] = arguments[2];
  }

  return nativeStartsWith.apply(str, args);
}; // Firefox (< 37?) and IE 11 TP have a non-compliant startsWith implementation


export var implementation = function startsWith(string, searchString) {
  var str = toStr(requireObjectCoercible(string));

  if (isRegExp(searchString)) {
    throw new TypeError(ERR_MSG);
  }

  var searchStr = toStr(searchString);
  /* eslint-disable-next-line prefer-rest-params */

  var position = arguments.length > 2 ? toInteger(arguments[2]) : 0;
  var start = position > 0 ? position : 0;
  return str.slice(start, start + searchStr.length) === searchStr;
};
/**
 * This method determines whether a string begins with the characters of a
 * specified string, returning true or false as appropriate.
 *
 * @param {string} string - The string to be search.
 * @throws {TypeError} If string is null or undefined.
 * @param {string} searchString - The characters to be searched for at the start of this string.
 * @throws {TypeError} If searchString is a RegExp.
 * @param {number} [position] -The position in this string at which to begin searching for searchString; defaults to 0.
 * @returns {boolean} `true` if the given characters are found at the beginning of the string; otherwise, `false`.
 */

var $startsWith = isWorking ? patchedStartsWith : implementation;
export default $startsWith;

//# sourceMappingURL=string-starts-with-x.esm.js.map