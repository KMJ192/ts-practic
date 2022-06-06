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

  public refCount: number;

  private freqMap: Map<number, DLLNode<number>>;

  public front: DLLNode<number> | null;

  public rear: DLLNode<number> | null;

  constructor(value: number) {
    this.val = value;

    this.refCount = 0;

    this.freqMap = new Map();

    this.front = null;

    this.rear = null;
  }

  public remove(key: number) {
    if (this.freqMap.has(key)) {
      const oldNode = this.freqMap.get(key) as DLLNode<number>;
      const prev = oldNode.prev;
      const next = oldNode.next;
      if (this.rear === oldNode) {
        this.rear = prev;
      }
      if (this.front === oldNode) {
        this.front = next;
      }

      oldNode.disconnect();

      this.freqMap.delete(key);
      this.refCount -= 1;
    }
  }

  public push_back(value: number) {
    const newNode = new DLLNode(value);
    if (this.rear === null) {
      this.front = newNode;
    } else {
      this.rear.next = newNode;
      newNode.prev = this.rear;
    }
    this.rear = newNode;
    this.refCount += 1;

    return this.rear;
  }

  public pop_front() {
    if (this.front === null) throw Error('Access empty memory');
    const key = this.front.value;
    this.remove(key);
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

  public get(key: number): number {
    if (this.dataInfo.has(key)) {
      const item = this.dataInfo.get(key) as CacheTable;
      const oldFreq = this.freq.get(item.freq) as Frequncy;
      oldFreq.remove(key);

      if (this.lowestFreq === oldFreq.val && oldFreq.refCount === 0) {
        this.lowestFreq += 1;
      }
      item.freq += 1;

      const curFreq = new Frequncy(item.freq);
      curFreq.push_back(key);
      this.freq.set(item.freq, curFreq);

      return item.value;
    }

    return -1;
  }

  public put(key: number, value: number): void {
    if (this.dataInfo.has(key)) {
      // cache에 데이터가 있음
      const item = this.dataInfo.get(key) as CacheTable;
      const oldFreq = this.freq.get(item.freq) as Frequncy;
      oldFreq.remove(key);

      item.freq += 1;
      item.value = value;

      const f = new Frequncy(item.freq);
      f.push_back(key);
      this.freq.set(key, f);
    } else if (this.capacity > 0) {
      // cache 메모리에 데이터가 없음
      if (this.length === this.capacity) {
        const lowestFreq = this.freq.get(this.lowestFreq) as Frequncy;
        this.dataInfo.delete((lowestFreq.front as DLLNode<number>).value);
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
  const cache = new LFUCache(2);
  console.log(cache.put(1, 1)); // 1: 1
  console.log(cache.put(2, 2)); // 1: 1, 2: 1
  console.log(cache.get(1)); // 1, 1: 2, 2: 1
  console.log(cache.put(3, 3)); // 1: 2, 3: 1
  console.log(cache.get(2)); // -1, 1: 2, 3: 1
  console.log(cache.get(3)); // 3, 1: 2, 3: 2
  console.log(cache.put(4, 4)); // 3: 2, 4: 1
  console.log(cache.get(1)); // -1
  console.log(cache.get(3)); // 3
  console.log(cache.get(4)); // 4
}

export default lfuCache;
