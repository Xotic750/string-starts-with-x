import attempt from 'attempt-x';
import toInteger from 'to-integer-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toStr from 'to-string-x';
import isRegExp from 'is-regexp-x';
var ERR_MSG = 'Cannot call method "startsWith" with a regex';
var sw = ERR_MSG.startsWith;
var nativeStartsWith = typeof sw === 'function' && sw;
var isWorking;

if (nativeStartsWith) {
  var res = attempt.call('/a/', nativeStartsWith, /a/);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt.call('abc', nativeStartsWith, 'a', 1 / 0);
    isWorking = res.threw === false && res.value === false;
  }

  if (isWorking) {
    res = attempt.call(123, nativeStartsWith, '1');
    isWorking = res.threw === false && res.value === true;
  }

  if (isWorking) {
    res = attempt.call(null, nativeStartsWith, 'n');
    isWorking = res.threw;
  }
}
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


var $startsWith;

if (isWorking) {
  $startsWith = function startsWith(string, searchString) {
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
  };
} else {
  // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
  $startsWith = function startsWith(string, searchString) {
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
}

var ssw = $startsWith;
export default ssw;

//# sourceMappingURL=string-starts-with-x.esm.js.map