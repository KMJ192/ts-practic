import ExtractCharacter from '../ExtractCharacter';
import Trie from '../Trie';

function AutoCompletion() {
  const tmp: Set<string> = new Set();
  const trie = new Trie();

  tmp.add('app');
  tmp.add('apple');
  tmp.add('append');
  tmp.add('한');
  tmp.add('한글');
  tmp.add('한글 자동완성');

  tmp.forEach((value: string) => {
    const extract = ExtractCharacter(value);
    const ext = extract.make();
    trie.insert(ext);
  });
  console.log(trie.maked);
  // console.log(trie.search('ㅎ'));

  // console.log('ㄱ'.charCodeAt(0));
  // console.log('ㅎ'.charCodeAt(0));
  // console.log('ㅏ'.charCodeAt(0));
  // console.log('ㅣ'.charCodeAt(0));
}

export default AutoCompletion;
