function createMemoizedFunction(originalFunction) {
  const cache = {};
  console.log("Memoization wrapper initialized.");
  console.log("Initial cache state:", cache);

  return function (input) {
    if (cache[input] !== undefined) {
      console.log("Fetching from cache:", input);
      return cache[input];
    }

    console.log("Computing result for:", input);
    const computedResult = originalFunction(input);
    cache[input] = computedResult;
    return computedResult;
  };
}

function squareNumber(number) {
  return number * number;
}

const memoizedSquare = createMemoizedFunction(squareNumber);

console.log(memoizedSquare(10));
console.log(memoizedSquare(9));
console.log(memoizedSquare(10));
