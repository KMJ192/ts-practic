class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T) {
    this.value = value;

    this.next = null;
  }
}

class LinkedList<T> {
  private front: LinkedListNode<T> | null = null;
  constructor() {}

  public get(index: number): T | number {
    let curIdx = 0;
    let curNode = this.front;
    while (curIdx !== index && curNode?.next != null) {
      curNode = curNode.next;
      curIdx += 1;
    }

    if (curIdx === index && curNode) {
      return curNode.value;
    }

    return -1;
  }

  addAtHead(val: T): void {
    if (!this.front) {
      this.front = new LinkedListNode<T>(val);
      return;
    }

    const curNode = this.front;
    this.front = new LinkedListNode<T>(val);
    this.front.next = curNode;
  }

  addAtTail(val: T): void {
    if (this.front === null) {
      this.addAtHead(val);
      return;
    }

    let curNode = this.front;
    while (curNode.next != null) {
      curNode = curNode.next;
    }
    curNode.next = new LinkedListNode<T>(val);
  }

  addAtIndex(index: number, val: T): void {
    if (index === 0) {
      this.addAtHead(val);
      return;
    }
    let curIdx = 0;
    let prevNode = null;
    let curNode = this.front;
    while (curNode !== null && curIdx !== index) {
      curIdx += 1;
      prevNode = curNode;
      curNode = prevNode.next;
    }

    if (curIdx === index && prevNode) {
      const newNode = new LinkedListNode<T>(val);
      prevNode.next = newNode;
      newNode.next = curNode;
    }
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.front = this.front?.next || null;
      return;
    }

    let prevNode = null;
    let curNode = this.front;
    let curIdx = 0;

    while (curIdx !== index && curNode?.next) {
      prevNode = curNode;
      curNode = curNode.next;
      curIdx += 1;
    }

    if (curIdx === index && prevNode) {
      prevNode.next = curNode?.next || null;
    }
  }
}

export function LinkedListRun() {
  // 4, 4, 0, 1
  let ll = new LinkedList<number>();
  ll.addAtHead(0);
  ll.addAtIndex(1, 1);
  ll.get(2); // -1
  ll.addAtHead(4);
  ll.get(2); // 1
  ll.addAtHead(4);
  console.log(ll);
  console.log(ll.get(2)); // 0
  // ll.addAtHead(3);
  // ll.addAtIndex(1, 6);
  // ll.addAtTail(1);
  // ll.addAtHead(0);
}
