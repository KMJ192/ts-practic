// function lengthOfLongestSubstring(s: string): number {
//   if (s.length === 1) return 1;
//   let first = 0,
//     second = 0;
//   let dictionary: { [key: string]: number } = {};
//   let count = 0;
//   let max = 0;
//   while (second < s.length) {
//     if (s[second] in dictionary) {
//       count = 0;
//       first++;
//       second = first;
//       dictionary = {};
//     }
//     dictionary[s[second]] = second;
//     count++;
//     second++;
//     max = Math.max(max, count);
//   }
//   return max;
// }

function lengthOfLongestSubstring(s: string) {
  let start = 0,
    temp = '',
    result = '';
  for (let i = 0; i < s.length; i++) {
    let index = temp.indexOf(s[i]);
    if (index !== -1) {
      start = start + index + 1;
    }
    temp = s.substring(start, i + 1);
    if (result.length < temp.length) {
      result = temp;
    }
  }

  return result.length;
}

export function run() {
  console.log(lengthOfLongestSubstring('abcabcbb'));
}
