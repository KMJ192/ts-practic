class TrieNode {
  public isWord: boolean;

  public word: string;

  public next: {
    [key: string]: TrieNode;
  };

  constructor() {
    this.isWord = false;

    this.next = {};

    this.word = '';
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public insert = (word: string) => {
    let curNode: TrieNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const c: string = word[i];
      if (!curNode.next[c]) {
        curNode.next[c] = new TrieNode();
      }
      curNode = curNode.next[c];
    }
    curNode.word = word;
    curNode.isWord = true;
  };

  public values = (word: string) => {
    let curNode: TrieNode = this.root;
    let datas: string[] = [];
    for (let i = 0; i < word.length; i++) {
      curNode = curNode.next[word.charAt(i)];
      if (!curNode) return undefined;
      if (curNode.isWord) {
        datas.push(curNode.word);
      }
    }

    return datas;
  };

  public search = (word: string) => {
    let curNode: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      curNode = curNode.next[word.charAt(i)];
      if (!curNode) return undefined;
    }
    return curNode.word;
  };

  public initialize = () => {
    this.root = new TrieNode();
  };

  get maked() {
    return this.root;
  }
}

export default Trie;
