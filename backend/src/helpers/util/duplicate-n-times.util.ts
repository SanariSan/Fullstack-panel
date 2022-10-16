function duplicateNTimes(n, str) {
  let output = ``;

  for (let i = 0; i < n; i += 1) {
    output += str;
  }

  return output;
}

export { duplicateNTimes };
