import { Subject } from 'rxjs';

import { Board } from './types';

function useBoard(): [Subject<Board>, (newBoard: Board) => void] {
  const board$ = new Subject<Board>();

  function updateBoard(board: Board): void {
    board$.next(board);
  }

  return [board$, updateBoard];
}

export default useBoard;
