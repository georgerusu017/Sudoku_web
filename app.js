// Work with modules
import { createSudokuGrid, createControlBoard } from './functions.js';
import { addButtonsListeners, addCellClickListeners, addKeyboardListeners, startGame } from './control.js';

createControlBoard();
createSudokuGrid();


startGame();


addCellClickListeners();
addKeyboardListeners();
addButtonsListeners();