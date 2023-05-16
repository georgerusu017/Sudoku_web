
import { createLayout } from './services/layout.service.js';
import { addEventListeners } from './services/eventHandler.service.js'
import state from './state/State.js'
import { SQUARES_IDS } from './constants.js';

createLayout();
addEventListeners();

state.startNewGame();
console.log("Square ids = ", SQUARES_IDS)