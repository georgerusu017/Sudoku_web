
class StateManager {
  constructor() {
    // transform into class
    this.cells = [];

    for (let i = 0; i < 81; i++) {
      const cell = {
        idText: `cell-${i}`,
        id: i,
        value: "0",
        isEditable: true,
        isHighlighted: false,
        isSelected: false,

      };
      this.cells.push(cell);
    }
    //
    this.listeners = new Set();

  }

  setCells() {
    this.cells = cells;
    this.notifyListeners();
  }

  getCells() {
    return this.cells;
  }
  // getter si setter pentru isHighlitghed si isSelected
  reset() {
    for (const cell of this.cells) {
      cell.isHighlighted = false;
      cell.isSelected = false;
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


const STATE = new StateManager();

// bad
const CELLS = STATE.getCells();

// for reset purpose
const CELLS_CLEAR = new StateManager(CELLS);

export {CELLS, STATE, CELLS_CLEAR}