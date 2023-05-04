// Work with modules
import { populateTable, createSudokuGrid, createControlBoard } from './functions.js';
import { SUDOKU_UNSOLVED } from './constants.js';
import { cellControl } from './control.js';

createControlBoard();
createSudokuGrid();
populateTable(SUDOKU_UNSOLVED);
cellControl();