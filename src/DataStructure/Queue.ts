class Node<T> {
  value: T;
  link: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.link = null;
  }
}

class Queue<T> {
  private front: Node<T> | null;
  private rear: Node<T> | null;
  private size: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  public top(): T | null {
    return this.front ? this.front.value : null;
  }

  public length(): number {
    return this.size;
  }

  public push(val: T) {
    const newNode = new Node(val);
    if (this.front === null) {
      this.front = newNode;
      this.rear = newNode;
      this.size += 1;
      return;
    }
    this.rear!.link = newNode;
    this.rear = newNode;
    this.size += 1;
  }

  public pop() {
    if (!this.front) return;
    const curNode = this.front.link;
    this.front.link = null;
    this.front = curNode;
    if (this.front === null) {
      this.rear = null;
    }
    this.size -= 1;
  }

  public isEmpty() {
    return this.front === null;
  }
}

function queueTest() {
  const q = new Queue<number>();
  q.push(1);
  console.log(q);
  q.push(2);
  console.log(q);
  q.push(3);
  // console.log(q);
  // q.pop();
  // console.log(q);
  // q.pop();
  // console.log(q);
}

export default queueTest;
