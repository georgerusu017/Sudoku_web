// Work with modules
import { populateTable, createSudokuGrid, createControlBoard } from './functions.js';
import { SUDOKU_UNSOLVED } from './constants.js';
import { cellClickPress, cellKeyPress, selectStartingCell } from './highlight.js';
import state from './state.js';

createControlBoard();
createSudokuGrid();
populateTable(SUDOKU_UNSOLVED);
cellClickPress();
cellKeyPress();
selectStartingCell();