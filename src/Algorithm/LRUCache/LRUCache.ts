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
}

class DoublyLinkedList<T> {
  private front: DLLNode<T> | null;
  private rear: DLLNode<T> | null;
  private size: number;
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  public push_front(value: T): DLLNode<T> {
    const newNode = new DLLNode(value);
    if (this.front === null) {
      this.rear = newNode;
    } else {
      this.front.prev = newNode;
      newNode.next = this.front;
    }
    this.front = newNode;
    this.size++;

    return this.front;
  }

  public push_back(value: T): DLLNode<T> {
    const newNode = new DLLNode(value);
    if (this.rear === null) {
      this.front = newNode;
    } else {
      this.rear.next = newNode;
      newNode.prev = this.rear;
    }
    this.rear = newNode;
    this.size++;

    return this.rear;
  }

  public pop_front(): DLLNode<T> {
    if (this.front === null) throw Error('Access empty memory');

    this.size--;
    const curNode = this.front;
    if (this.front.next === null) {
      this.front = null;
      this.rear = null;
    } else {
      this.front.next.prev = null;
      this.front = this.front.next;
    }

    curNode.next = null;
    curNode.prev = null;
    return curNode;
  }

  public pop_back(): DLLNode<T> {
    if (this.rear === null) throw Error('Access empty memory');

    this.size--;
    const curNode = this.rear;
    if (this.rear.prev === null) {
      this.front = null;
      this.rear = null;
    } else {
      this.rear.prev.next = null;
      this.rear = this.rear.prev;
    }

    curNode.next = null;
    curNode.prev = null;

    return curNode;
  }

  public remove(node: DLLNode<T>) {
    this.size--;
    const prev = node.prev;
    const next = node.next;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (this.rear === node) {
      this.rear = prev;
    }

    if (this.front === node) {
      this.front = next;
    }

    node.prev = null;
    node.next = null;
  }

  public length(): number {
    return this.size;
  }

  public top(): DLLNode<T> | null {
    return this.front;
  }

  public bottom(): DLLNode<T> | null {
    return this.rear;
  }
}

class LRUCache {
  private link: Map<number, DLLNode<Tuple<number, number>>>;

  private list: DoublyLinkedList<Tuple<number, number>>;

  constructor(private capacity: number) {
    this.link = new Map();

    this.list = new DoublyLinkedList();
  }

  public get(key: number): number {
    if (this.link.has(key)) {
      const curNode = this.link.get(key) as DLLNode<Tuple<number, number>>;
      const [k, v] = curNode.value;
      this.list.remove(curNode);

      this.link.set(k, this.list.push_front(MakePair<number, number>(k, v)));
      return curNode.value[1];
    }
    return -1;
  }

  public put(key: number, value: number): void {
    if (this.link.has(key)) {
      const curNode = this.link.get(key) as DLLNode<Tuple<number, number>>;
      this.list.remove(curNode);
    } else if (this.capacity === this.list.length()) {
      const [k, _] = this.list.pop_back().value;
      this.link.delete(k);
    }

    this.link.set(
      key,
      this.list.push_front(MakePair<number, number>(key, value)),
    );
  }

  public display() {
    console.log(this.list.bottom()?.value);
  }
}

function lruCache() {
  const cache = new LRUCache(3);
  cache.put(0, 0);
  cache.display(); // 0
  cache.put(1, 1);
  cache.display(); // 0
  cache.put(1, 1);
  cache.display(); // 0
  cache.put(2, 2);
  cache.display(); // 0
  cache.put(0, 0);
  cache.display(); // 1
  cache.put(9, 9);
  cache.display(); // 2
  cache.put(8, 8);
  cache.display(); // 0
  cache.put(2, 2);
  cache.display(); // 9
  cache.put(1, 1);
  cache.display(); // 8
}

export default lruCache;
