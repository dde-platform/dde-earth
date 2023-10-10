export function findMostSimilarString(
  strings: string[],
  target: string,
): string | null {
  if (strings.length === 0) {
    return null;
  }

  const lowercaseTarget = target.toLowerCase();

  let mostSimilarString = strings[0];
  let longestPrefixLength = getCommonPrefixLength(
    mostSimilarString.toLowerCase(),
    lowercaseTarget,
  );

  for (let i = 1; i < strings.length; i++) {
    const currentString = strings[i];
    const currentPrefixLength = getCommonPrefixLength(
      currentString.toLowerCase(),
      lowercaseTarget,
    );

    if (currentPrefixLength > longestPrefixLength) {
      mostSimilarString = currentString;
      longestPrefixLength = currentPrefixLength;
    }
  }

  return mostSimilarString;
}

function getCommonPrefixLength(str1: string, str2: string): number {
  let commonPrefixLength = 0;
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] === str2[i]) {
      commonPrefixLength++;
    } else {
      break;
    }
  }

  return commonPrefixLength;
}

/**
 * Deeply merges multiple objects into the original object.
 * @param target The original object where other objects will be merged into.
 * @param sources The list of objects to merge.
 * @returns The merged original object.
 */
export function deepMerge(target: any, ...sources: any[]) {
  const mergedObj = { ...target };
  /**
   * Recursively merges the target object and the source object.
   * @param targetObj The target object.
   * @param sourceObj The source object.
   * @returns The merged object.
   */
  function merge(targetObj: any, sourceObj: any) {
    if (typeof targetObj !== 'object' || typeof sourceObj !== 'object') {
      return sourceObj;
    }

    for (const key in sourceObj) {
      if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
        if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
          targetObj[key] = merge(targetObj[key], sourceObj[key]);
        } else {
          targetObj[key] = sourceObj[key];
        }
      }
    }

    return targetObj;
  }

  // Iterate through all source objects and merge them into the target object one by one
  for (const source of sources) {
    merge(mergedObj, source);
  }

  return mergedObj;
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function convertToAsync<T = any>(
  result: T | Promise<T>,
): Promise<T> {
  if (result instanceof Promise) {
    return await result;
  } else {
    return result;
  }
}

export function convertToAsyncFunc<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const result = func(...args);
    if (result instanceof Promise) {
      return await result;
    } else {
      return result;
    }
  };
}
