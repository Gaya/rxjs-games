import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

import {
  Board, Game, Player, PlayerInput, Tile, TileRow,
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

const isX = (c: Tile): boolean => c === Tile.x;
const isO = (c: Tile): boolean => c === Tile.o;

function rowWinner(row: TileRow): Player | undefined {
  if (row.every(isX)) {
    return Player.x;
  }

  if (row.every(isO)) {
    return Player.o;
  }

  return undefined;
}

export function whoWon(board: Board): Player | undefined {
  const rows: TileRow[] = [];

  // verticals
  for (let x = 0; x < 3; x += 1) {
    rows.push([board[0][x], board[1][x], board[2][x]]);
  }

  // horizontals
  for (let y = 0; y < 3; y += 1) {
    rows.push([board[y][0], board[y][1], board[y][2]]);
  }

  rows.push([board[0][0], board[1][1], board[2][2]]);
  rows.push([board[2][0], board[1][1], board[0][2]]);

  for (let i = 0; i < rows.length; i += 1) {
    const winner = rowWinner(rows[i]);
    if (winner) return winner;
  }

  return undefined;
}

function newGameByInput(state: Game, input: PlayerInput): Game {
  const board: Board = [state.board[0], state.board[1], state.board[2]];

  board[input.y][input.x] = playerToTile(state.current);

  const winner = whoWon(board);
  const gameEnd = !!winner;

  return {
    current: gameEnd ? state.current : nextCurrentPlayer(state.current),
    board,
  };
}

function newGame(): Game {
  return {
    current: Math.random() > 0.5 ? Player.x : Player.o,
    board: defaultBoard,
  };
}

export function createGame(input$: Observable<PlayerInput>): BehaviorSubject<Game> {
  const game$ = new BehaviorSubject<Game>(newGame());

  // handle playing input
  input$
    .pipe(
      withLatestFrom(game$),
      // nobody won
      filter(([, state]) => whoWon(state.board) === undefined),
      // tile clicked on is empty
      filter(([input, state]) => isTileEmpty(state.board, input)),
      // calculate new game state
      map(([input, state]) => newGameByInput(state, input)),
      // update game state
      tap((state) => game$.next(state)),
    )
    .subscribe((state) => {
      console.log(state);
    });

  return game$;
}
