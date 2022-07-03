class Heap<T> {
  protected heap: { [key: number]: T };
  protected size: number;
  constructor() {
    this.heap = {};
    this.size = 1;
  }
}
