import useBoard from './board';
import createRenderer from './renderer';
import clicks$ from './clicks';

import { Board } from './types';

const defaultBoard: Board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function startTicTacToe(): void {
  const [board$, updateBoard] = useBoard();

  board$.subscribe(createRenderer());

  clicks$
    .subscribe((position) => {
      console.log(position);
    });

  // initial game start
  updateBoard(defaultBoard);
}

export default startTicTacToe;
