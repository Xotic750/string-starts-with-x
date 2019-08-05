import attempt from 'attempt-x';
import toInteger from 'to-integer-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toStr from 'to-string-x';
import isRegExp from 'is-regexp-x';
import toBoolean from 'to-boolean-x';

const ERR_MSG = 'Cannot call method "startsWith" with a regex';
const sw = ERR_MSG.startsWith;
const nativeStartsWith = typeof sw === 'function' && sw;

const test1 = function test1() {
  return attempt.call('/a/', nativeStartsWith, /a/).threw;
};

const test2 = function test2() {
  const res = attempt.call('abc', nativeStartsWith, 'a', 1 / 0);

  return res.threw === false && res.value === false;
};

const test3 = function test3() {
  const res = attempt.call(123, nativeStartsWith, '1');

  return res.threw === false && res.value === true;
};

const test4 = function test4() {
  return attempt.call(null, nativeStartsWith, 'n').threw;
};

const isWorking = toBoolean(nativeStartsWith) && test1() && test2() && test3() && test4();

const patchedStartsWith = function startsWith(string, searchString) {
  const str = requireObjectCoercible(string);

  if (isRegExp(searchString)) {
    throw new TypeError(ERR_MSG);
  }

  const args = [searchString];

  if (arguments.length > 2) {
    /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
    args[1] = arguments[2];
  }

  return nativeStartsWith.apply(str, args);
};

// Firefox (< 37?) and IE 11 TP have a non-compliant startsWith implementation
export const implementation = function startsWith(string, searchString) {
  const str = toStr(requireObjectCoercible(string));

  if (isRegExp(searchString)) {
    throw new TypeError(ERR_MSG);
  }

  const searchStr = toStr(searchString);
  /* eslint-disable-next-line prefer-rest-params */
  const position = arguments.length > 2 ? toInteger(arguments[2]) : 0;
  const start = position > 0 ? position : 0;

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
const $startsWith = isWorking ? patchedStartsWith : implementation;

export default $startsWith;
