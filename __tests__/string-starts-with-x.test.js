let startsWith;

describe('startsWith', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof startsWith).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(1);
    expect(function() {
      startsWith();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      startsWith(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      startsWith(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should be truthy on correct results', function() {
    expect.assertions(1);
    expect(startsWith('test', 'te')).toBe(true);
    expect(startsWith('test', 'st')).toBe(false);
    expect(startsWith('', '/')).toBe(false);
    expect(startsWith('#', '/')).toBe(false);
    expect(startsWith('##', '///')).toBe(false);

    expect(startsWith('abc', 'abc')).toBe(true);
    expect(startsWith('abcd', 'abc')).toBe(true);
    expect(startsWith('abc', 'a')).toBe(true);
    expect(startsWith('abc', 'abcd')).toBe(false);
    expect(startsWith('abc', 'bcde')).toBe(false);
    expect(startsWith('abc', 'b')).toBe(false);
    expect(startsWith('abc', 'abc', 0)).toBe(true);
    expect(startsWith('abc', 'bc', 0)).toBe(false);
    expect(startsWith('abc', 'bc', 1)).toBe(true);
    expect(startsWith('abc', 'c', 1)).toBe(false);
    expect(startsWith('abc', 'abc', 1)).toBe(false);
    expect(startsWith('abc', 'c', 2)).toBe(true);
    expect(startsWith('abc', 'd', 2)).toBe(false);
    expect(startsWith('abc', 'dcd', 2)).toBe(false);
    expect(startsWith('abc', 'a', NaN)).toBe(true);
    expect(startsWith('abc', 'b', NaN)).toBe(false);
    expect(startsWith('abc', 'ab', -43)).toBe(true);
    expect(startsWith('abc', 'ab', -Infinity)).toBe(true);
    expect(startsWith('abc', 'bc', -42)).toBe(false);
    expect(startsWith('abc', 'bc', -Infinity)).toBe(false);
  });

  it('should handle large positions', function() {
    expect.assertions(1);
    expect(startsWith('abc', 'a', 42)).toBe(false);
    expect(startsWith('abc', 'a', Infinity)).toBe(false);
  });

  it('should coerce to a string', function() {
    expect.assertions(1);
    expect(
      startsWith('abcd', {
        toString() {
          return 'ab';
        },
      }),
    ).toBe(true);

    expect(
      startsWith('abcd', {
        toString() {
          return 'foo';
        },
      }),
    ).toBe(false);
  });

  it('should not allow a regex', function() {
    expect.assertions(1);
    expect(function() {
      return startsWith('abcd', /abc/);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      return startsWith('abcd', new RegExp('abc'));
    }).toThrowErrorMatchingSnapshot();
  });
});
