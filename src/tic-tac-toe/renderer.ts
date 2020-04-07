import { Board, Tile, TileRow } from './types';

function createTile(tileState: Tile, x: number, y: number): HTMLTableCellElement {
  const tile = document.createElement('td');

  tile.style.borderWidth = '1px';
  tile.style.borderColor = '#ffffff';
  tile.style.borderStyle = 'solid';
  tile.style.width = '50px';
  tile.style.height = '50px';
  tile.style.textAlign = 'center';
  tile.style.fontSize = '2em';

  if (x !== 0) {
    tile.style.borderLeftColor = '#000000';
  }

  if (y !== 2) {
    tile.style.borderBottomColor = '#000000';
  }

  switch (tileState) {
    case Tile.x:
      tile.style.color = 'blue';
      tile.innerText = 'X';
      break;
    case Tile.o:
      tile.style.color = 'red';
      tile.innerText = 'O';
      break;
    default:
    case Tile.empty:
      tile.innerText = '';
      break;
  }

  return tile;
}

function createRow(y: number, tiles: TileRow): HTMLTableRowElement {
  const row = document.createElement('tr');

  for (let x = 0; x < 3; x += 1) {
    row.appendChild(createTile(tiles[x], x, y));
  }

  return row;
}

function createRenderer(): (board: Board) => void {
  let boardDOM = document.getElementById('tttBoard');

  if (!boardDOM) {
    boardDOM = document.createElement('table');
    boardDOM.setAttribute('id', 'tttBoard');

    boardDOM.style.borderSpacing = '0px';

    document.body.appendChild(boardDOM);
  }

  return function renderBoard(board: Board): void {
    for (let y = 0; y < 3; y += 1) {
      boardDOM.appendChild(createRow(y, board[y]));
    }
  };
}

export default createRenderer;
