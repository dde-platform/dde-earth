export function findMostSimilarString(
  strings: string[],
  target: string,
): string | null {
  if (strings.length === 0) {
    return null;
  }

  let mostSimilarString = strings[0];
  let longestPrefixLength = getCommonPrefixLength(mostSimilarString, target);

  for (let i = 1; i < strings.length; i++) {
    const currentString = strings[i];
    const currentPrefixLength = getCommonPrefixLength(currentString, target);

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
export function deepMerge(target: any, source: any): any {
  if (typeof target !== 'object' || typeof source !== 'object') {
    return source;
  }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
