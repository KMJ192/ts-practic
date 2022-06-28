// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param s
 * @returns
 */
function lengthOfLongestSubstring(s: string): number {
  if (s === '') return 0;
  const r = s[0];
  for (let i = 0; i < s.length; i++) {
    if (r !== s[i]) {
      return compare(s);
    }
  }

  return 1;
}

function compare(s: string) {
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const obj = s.substring(i, j);
      if (isRepetation(s, i, j, obj)) {
        answer = Math.max(answer, obj.length);
      }
    }
  }

  return answer;
}

function isRepetation(
  s: string,
  idx1: number,
  idx2: number,
  obj: string,
): boolean {
  if (!obj) return false;
  const first = s.substring(0, idx1);
  const second = s.substring(idx2);

  if (obj === first || obj === second) return true;

  return false;
}

export function run() {
  console.log(lengthOfLongestSubstring('abcabcbb'));
}
