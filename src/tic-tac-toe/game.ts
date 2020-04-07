import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { filter } from 'rxjs/internal/operators/filter';

import {
  Board, Game, Player, PlayerInput, Tile,
} from './types';

const defaultBoard: Board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function isTileEmpty(board: Board, input: PlayerInput): boolean {
  return board[input.y][input.x] === Tile.empty;
}

function playerToTile(player: Player): Tile {
  return player === Player.x ? Tile.x : Tile.o;
}

function nextCurrentPlayer(current: Player): Player {
  return (current === Player.x) ? Player.o : Player.x;
}

function newGameByInput(state: Game, input: PlayerInput): Game {
  const board = [...state.board];

  board[input.y][input.x] = playerToTile(state.current);

  return {
    current: nextCurrentPlayer(state.current),
    board: state.board,
  };
}

export function createGame(input$: Observable<PlayerInput>): BehaviorSubject<Game> {
  const game$ = new BehaviorSubject<Game>({
    current: Math.random() > 0.5 ? Player.x : Player.o,
    board: defaultBoard,
  });

  input$
    .pipe(
      withLatestFrom(game$),
      filter(([input, state]) => isTileEmpty(state.board, input)),
    )
    .subscribe(([input, state]) => {
      game$.next(newGameByInput(state, input));
    });

  return game$;
}
