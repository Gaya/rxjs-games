export interface PlayerInput {
  x: number;
  y: number;
}

export enum Player {
  x = 'X',
  o = 'O',
}

export interface Game {
  current: Player;
  board: Board;
}

export enum Tile {
  empty,
  x,
  o,
}

export type TileRow = [Tile, Tile, Tile];

export type Board = [TileRow, TileRow, TileRow];
