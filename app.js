// Work with modules
import { createLayout } from './services/layout.service.js';
import { addEventListeners } from './services/eventHandler.service.js'
import state from './state/State.js'

createLayout();
addEventListeners();

state.startNewGame();
