type MenuItem = {};

interface Iterator {
  hasNext: () => boolean;
  next: () => MenuItem;
}

class PancakeHouseIterator implements Iterator {
  private position: number;
  private items: Array<MenuItem>;

  constructor(menuItems: Array<MenuItem>) {
    this.position = 0;

    this.items = menuItems;
  }

  public MenuIterator(items: Array<MenuItem>) {
    this.items = items;
  }

  public next(): MenuItem {
    const menuItem = this.items[this.position];
    this.position += 1;
    return menuItem;
  }

  public hasNext(): boolean {
    if (
      this.position >= this.items.length ||
      this.items[this.position] == null
    ) {
      return false;
    }
    return true;
  }
}

class PancakeHouseMenu {
  private numberOfItems: number;
  private menuItems: Array<MenuItem>;

  constructor(menuItems: Array<MenuItem>) {
    this.numberOfItems = menuItems.length;

    this.menuItems = menuItems;
  }

  public createIterator() {
    return new PancakeHouseIterator(this.menuItems);
  }
}

function Run() {
  // const phi = new PancakeHouseIterator();
}

export default Run;
