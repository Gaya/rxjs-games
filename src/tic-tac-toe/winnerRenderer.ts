import { Player } from './types';

function createWinnerRenderer(): (player: Player) => void {
  let winnerDOM = document.getElementById('tttWinner');

  if (!winnerDOM) {
    winnerDOM = document.createElement('div');
    winnerDOM.setAttribute('id', 'winnerDOM');

    winnerDOM.style.marginTop = '2em';

    document.body.appendChild(winnerDOM);
  }

  return function renderBoard(winner?: Player): void {
    const winnerText = winner ? `Player ${winner} won the game!` : 'Nobody won.';

    winnerDOM.innerText = `${winnerText} Refresh to start over`;
  };
}

export default createWinnerRenderer;
