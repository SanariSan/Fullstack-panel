function isPalindrome<T>(arr: readonly T[]) {
  for (let i = 0, k = arr.length - 1; i < Math.floor(arr.length / 2); i += 1, k -= 1) {
    if (arr[i] !== arr[k]) return false;
  }

  return true;
}

export { isPalindrome };
