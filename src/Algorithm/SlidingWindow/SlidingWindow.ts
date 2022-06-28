function slidingWindow(nums: number[], k: number): number[] {
  let answer = Array.from(
    { length: nums.length - k + 1 },
    () => Number.MIN_VALUE,
  );
  let first = 0,
    second = k - 1;

  return answer;
}

// priority queue이용하기

export function run() {
  console.log(slidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
}
