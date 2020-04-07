import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, map } from 'rxjs/operators';

function getPosition(element: HTMLElement): number {
  return Array.from(element.parentNode.childNodes).indexOf(element);
}

const clicks$ = fromEvent(document, 'click')
  .pipe(
    filter((e: MouseEvent) => {
      const target = e.target as HTMLTableCellElement;
      return target.nodeName === 'TD';
    }),
    map((e: MouseEvent) => {
      const cell = e.target as HTMLTableCellElement;
      const row = cell.parentElement;

      return { x: getPosition(cell), y: getPosition(row) };
    }),
  );

export default clicks$;
