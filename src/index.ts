import { addRoute, renderPage } from './router';
import home from './home';

import ticTacToe from './tic-tac-toe';
import recursiveApi from './recursive-api';

addRoute('/', home);
addRoute('/tictactoe', ticTacToe);
addRoute('/recursive-api', recursiveApi);

renderPage();
