import { tap } from 'rxjs/internal/operators/tap';

import { createGame } from './game';
import createBoardRenderer from './boardRenderer';
import createCurrentPlayerRenderer from './currentPlayerRenderer';
import input$ from './input';

function startTicTacToe(): void {
  const currentPlayerRenderer = createCurrentPlayerRenderer();
  const boardRenderer = createBoardRenderer();
  const game$ = createGame(input$);

  game$.pipe(
    tap((state) => currentPlayerRenderer(state.current)),
    tap((state) => boardRenderer(state.board)),
  ).subscribe();
}

export default startTicTacToe;
