import { addRoute, renderPage } from './router';
import home from './home';

import ticTacToe from './tic-tac-toe';

addRoute('/', home);
addRoute('/tictactoe', ticTacToe);

renderPage();
