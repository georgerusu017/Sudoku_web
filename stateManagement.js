const CELLS = [];

for (let i = 0; i < 81; i++) {
    const cell = {
      idText: `cell-${i}`,
      id: i,
      value: "0",
      isEditable: true,
      isHighlighted: false,
      isSelected: false,
      initialClass: 'cell',
      //parent 
      // Element
  }
  CELLS.push(cell);
}

// reset function in class to reset - DONE
// selected, hilighted - DONE

class StateManager {
  constructor() {

    this.cells = [];

    for (let i = 0; i < 81; i++) {
      const cell = {
        idText: `cell-${i}`,
        id: i,
        value: "0",
        isEditable: true,
        isHighlighted: false,
        isSelected: false,
        initialClass: "cell",

      };
      this.cells.push(cell);
    }

    this.listeners = new Set();

  }

  setCells() {
    this.cells = cells;
    this.notifyListeners();
  }

  getCells() {
    return this.cells;
  }

  reset() {
    for (const cell of this.cells) {
      cell.isHighlighted = false;
      cell.isSelected = false;
      cell.initialClass = "cell";
    }
    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  removeListener(listener) {
    this.listeners.delete(listener); 
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}