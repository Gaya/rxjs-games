export enum Tile {
  empty,
  x,
  o,
}

export type TileRow = [Tile, Tile, Tile];

export type Board = [TileRow, TileRow, TileRow];
