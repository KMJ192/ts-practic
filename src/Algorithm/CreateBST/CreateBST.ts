class BSTNode {
  public left: BSTNode | null;
  public right: BSTNode | null;
  public value: number;
  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BST {
  private root: BSTNode | null;
  private dictionary: Map<number, BSTNode>;
  constructor() {
    this.root = null;
    this.dictionary = new Map();
  }

  private insert(node: BSTNode, n: number) {
    const { value } = node;
    if (value > n) {
      // 1. 왼쪽 하위 트리로 삽입
      if (node.left === null) {
        node.left = new BSTNode(n);
        this.dictionary.set(n, node.left);
        return;
      }
      this.insert(node.left, n);
    } else {
      // 2. 오른쪽 하위 트로 삽입
      if (node.right === null) {
        node.right = new BSTNode(n);
        this.dictionary.set(n, node.right);
        return;
      }
      this.insert(node.right, n);
    }
  }

  public delete(value: number) {
    const node = this.dictionary.get(value);
    const isLeafNode = node?.left === null && node?.right === null;
  }

  public search(value: number) {
    return this.dictionary.get(value);
  }

  public build(values: Set<number>) {
    let isFirst = true;
    values.forEach((value: number) => {
      if (isFirst) {
        this.root = new BSTNode(value);
        isFirst = false;
      } else this.insert(this.root as BSTNode, value);
    });
  }

  get getRoot() {
    return this.root;
  }
}

function createBST() {
  const values = new Set([20, 34, 23, 53, 3, 223, 19, 15, 5]);

  const bst = new BST();

  bst.build(values);

  // console.log(bst.search(34));

  console.log(bst.getRoot);

  bst.delete(34);

  console.log(bst.getRoot);
}

export default createBST;
