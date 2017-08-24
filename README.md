<a href="https://travis-ci.org/Xotic750/string-starts-with-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/string-starts-with-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/string-starts-with-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/string-starts-with-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/string-starts-with-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/string-starts-with-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/string-starts-with-x" title="npm version">
<img src="https://badge.fury.io/js/string-starts-with-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_string-starts-with-x"></a>

## string-starts-with-x
Determines whether a string begins with the characters of a specified string.

**Version**: 1.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_string-starts-with-x--module.exports"></a>

### `module.exports` ⇒ <code>boolean</code> ⏏
This method determines whether a string begins with the characters of a
specified string, returning true or false as appropriate.

**Kind**: Exported member  
**Returns**: <code>boolean</code> - `true` if the given characters are found at the beginning
 of the string; otherwise, `false`.  
**Throws**:

- <code>TypeError</code> If string is null or undefined.
- <code>TypeError</code> If searchString is a RegExp.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to be search. |
| searchString | <code>string</code> | The characters to be searched for at the start  of this string. |
| [position] | <code>number</code> | The position in this string at which to begin  searching for searchString; defaults to 0. |

**Example**  
```js
var strinStartsWith = require('string-starts-with-x');
```
