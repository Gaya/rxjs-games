import { Player } from './types';

function playerColor(player: Player): string {
  return player === Player.x ? 'blue' : 'red';
}

function createCurrentPlayerRenderer(): (player: Player) => void {
  let currentPlayerDOM = document.getElementById('tttPlayer');

  if (!currentPlayerDOM) {
    currentPlayerDOM = document.createElement('div');
    currentPlayerDOM.setAttribute('id', 'tttPlayer');

    document.body.appendChild(currentPlayerDOM);
  }

  currentPlayerDOM.style.marginBottom = '2em';

  return function renderCurrentPlayer(player: Player): void {
    currentPlayerDOM.style.color = playerColor(player);
    currentPlayerDOM.innerHTML = `Current player is ${player}`;
  };
}

export default createCurrentPlayerRenderer;
