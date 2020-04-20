import { from } from 'rxjs';

import { routes$ } from './router';
import { clearBody } from './helpers';

export default function home(): void {
  routes$.subscribe((routes) => {
    clearBody();

    const header = document.createElement('h1');
    header.innerText = 'RxJS Playground';
    document.body.appendChild(header);

    const list = document.createElement('ul');
    document.body.appendChild(list);

    from(routes.keys())
      .subscribe((key: string) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = key;
        link.innerText = key;

        listItem.appendChild(link);
        list.appendChild(listItem);
      });
  });
}
