class Char {
  public value: string;
  constructor(value: string) {
    if (value.length > 1) {
      throw new Error('not a char');
    }
    this.value = value;
  }

  public charCodeAt = (num: number) => {
    return this.value.charCodeAt(num);
  };
}

function isHangul(word: Char) {
  const code = word.charCodeAt(0) - 0xac00;

  // 한글 범위 계산
  const start = '가'.charCodeAt(0) - 0xac00;
  const end = '힣'.charCodeAt(0) - 0xac00;

  return code >= start && code <= end;
}

function makeDictionary(s: string) {
  const sentence = s;
  const korean = {
    chosung: [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ],
    jungsung: [
      'ㅏ',
      'ㅐ',
      'ㅑ',
      'ㅒ',
      'ㅓ',
      'ㅔ',
      'ㅕ',
      'ㅖ',
      'ㅗ',
      'ㅘ',
      'ㅙ',
      'ㅚ',
      'ㅛ',
      'ㅜ',
      'ㅝ',
      'ㅞ',
      'ㅟ',
      'ㅠ',
      'ㅡ',
      'ㅢ',
      'ㅣ',
    ],
    jongsung: [
      '',
      'ㄱ',
      'ㄲ',
      'ㄳ',
      'ㄴ',
      'ㄵ',
      'ㄶ',
      'ㄷ',
      'ㄹ',
      'ㄺ',
      'ㄻ',
      'ㄼ',
      'ㄽ',
      'ㄾ',
      'ㄿ',
      'ㅀ',
      'ㅁ',
      'ㅂ',
      'ㅄ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ],
  };

  let result: string = '';

  function disassemble(c: Char) {
    let r: string[] = [];
    const uniVal = c.charCodeAt(0) - 0xac00;
    const cho = Math.floor(uniVal / 28 / 21);
    const jung = Math.floor((uniVal / 28) % 21);
    const jong = Math.floor(uniVal % 28);

    if (korean.chosung[cho]) {
      r.push(korean.chosung[cho]);
    }

    if (korean.jungsung[jung]) {
      r.push(korean.jungsung[jung]);
    }

    if (korean.jongsung[jong]) {
      r.push(korean.jongsung[jong]);
    }

    return r;
  }

  function make() {
    for (let i = 0; i < sentence.length; i++) {
      const c: Char = new Char(sentence[i]);
      if (isHangul(c)) {
        const ext = disassemble(c);
        ext.forEach((d: string) => {
          result = `${result}${d}`;
        });
      } else {
        result = `${result}${c.value}`;
      }
    }

    return result;
  }

  const extractResult = () => {
    return result;
  };

  return {
    disassemble,
    make,
    extractResult,
  };
}

export default makeDictionary;
