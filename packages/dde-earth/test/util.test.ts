import { describe, expect, it } from 'vitest';

import { deepMerge } from '../src/utils';

describe('deepMerge', () => {
  it('should merge two objects correctly', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const expectedResult = { a: 1, b: 3, c: 4 };

    expect(deepMerge(target, source)).toEqual(expectedResult);
  });

  it('should recursively merge nested objects', () => {
    const target = { a: { b: 1 } };
    const source = { a: { c: 2 } } as any;
    const expectedResult = { a: { b: 1, c: 2 } };

    expect(deepMerge(target, source)).toEqual(expectedResult);
  });

  it('should handle undefined and null sources', () => {
    const target = { a: 1 };
    const source1 = undefined;
    const source2 = null;
    const expectedResult = { a: 1 };

    expect(deepMerge(target, source1, source2)).toEqual(expectedResult);
  });

  it('should handle empty target object', () => {
    const target = {};
    const source = { a: 1 };
    const expectedResult = { a: 1 };

    expect(deepMerge(target, source)).toEqual(expectedResult);
  });
});
