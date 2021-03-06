import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';

import { createGame, gameEnded, whoWon } from './game';
import createBoardRenderer from './boardRenderer';
import createCurrentPlayerRenderer from './currentPlayerRenderer';
import createWinnerRenderer from './winnerRenderer';
import input$ from './input';

function startTicTacToe(): void {
  const currentPlayerRenderer = createCurrentPlayerRenderer();
  const boardRenderer = createBoardRenderer();
  const winnerRenderer = createWinnerRenderer();
  const game$ = createGame(input$);

  game$.pipe(
    tap((state) => currentPlayerRenderer(state.current)),
    tap((state) => boardRenderer(state.board)),
    filter((state) => gameEnded(state.board)),
    tap((state) => winnerRenderer(whoWon(state.board))),
  ).subscribe();
}

export default startTicTacToe;
