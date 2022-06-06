type Tuple<T, N> = Array<T | N>;

const MakePair = <T, N>(a: T, b: N): Tuple<T, N> => {
  return [a, b];
};

class DLLNode<T> {
  public prev: DLLNode<T> | null;
  public next: DLLNode<T> | null;
  constructor(public value: T) {
    this.prev = null;
    this.next = null;
  }

  public disconnect() {
    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }

    this.prev = null;
    this.next = null;
  }
}

class Frequncy {
  public val: number;

  private refCount: number;

  private freqMap: Map<number, DLLNode<number>>;

  public head: DLLNode<number> | null;

  public tail: DLLNode<number> | null;

  constructor(value: number) {
    this.val = value;

    this.refCount = 0;

    this.freqMap = new Map();

    this.head = null;

    this.tail = null;
  }

  public removeKey(key: number) {
    if (this.freqMap.has(key)) {
      const oldNode = this.freqMap.get(key) as DLLNode<number>;

      oldNode.disconnect();

      this.freqMap.delete(key);
      this.refCount -= 1;
    }
  }

  public push_back(value: number) {
    const newNode = new DLLNode(value);
    if (this.tail === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;

    return this.tail;
  }

  public pop_front() {
    if (this.head === null) throw Error('Access empty memory');

    const curNode = this.head;
    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.next.prev = null;
      this.head = this.head.next;
    }

    curNode.next = null;
    curNode.prev = null;
    return curNode;
  }
}

interface CacheTable {
  value: number;
  freq: number;
}

class LFUCache {
  private length: number;

  private lowestFreq: number;

  private dataInfo: Map<number, CacheTable>;

  private freq: Map<number, Frequncy>;

  constructor(private capacity: number) {
    this.length = 0;

    this.lowestFreq = 0;

    this.dataInfo = new Map();

    this.freq = new Map();
  }

  get(key: number): number {
    return 0;
  }

  put(key: number, value: number): void {
    if (this.dataInfo.has(key)) {
      const item = this.dataInfo.get(key) as CacheTable;
      const oldFreq = this.freq.get(key) as Frequncy;
      oldFreq.removeKey(key);
    } else if (this.capacity > 0) {
      if (this.length === this.capacity) {
        const lowestFreq = this.freq.get(key) as Frequncy;
        this.dataInfo.delete((lowestFreq.head as DLLNode<number>).value);
        lowestFreq.pop_front();
        this.length -= 1;
      }

      this.dataInfo.set(key, {
        value,
        freq: 1,
      });

      const curFreq = new Frequncy(1);
      curFreq.push_back(key);
      this.freq.set(1, curFreq);
      this.length += 1;
      this.lowestFreq = 1;
    }
  }
}

function lfuCache() {
  const obj = new LFUCache(4);
  const data = [0, 1, 1, 2, 0, 9, 8, 2, 1];
}

export default lfuCache;
