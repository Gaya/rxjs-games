import { EMPTY, from, Observable } from 'rxjs';
import {
  expand, map, reduce, tap,
} from 'rxjs/operators';

interface Response {
  items: number[];
  page: number;
  pageCount: number;
}

const responses: Response[] = [
  {
    items: [1, 2, 3, 4, 5],
    page: 1,
    pageCount: 4,
  },
  {
    items: [6, 7, 8, 9, 10],
    page: 2,
    pageCount: 4,
  },
  {
    items: [11, 12, 13, 14, 15],
    page: 3,
    pageCount: 4,
  },
  {
    items: [16, 17, 18, 19, 20],
    page: 4,
    pageCount: 4,
  },
];

function log(...messages: any[]): void {
  const logItem = document.createElement('div');
  const string = messages.map((m) => JSON.stringify(m)).join(', ');
  logItem.innerText = string;
  document.body.appendChild(logItem);
}

function fetchPage(page = 1): Observable<Response> {
  log('Fetching page', page);
  return from(Promise.resolve(responses[page - 1]));
}

function fetchPaged(): Observable<number[]> {
  return fetchPage(1)
    .pipe(
      expand(
        (response: Response) => {
          if (response.page < response.pageCount) {
            return fetchPage(response.page + 1);
          }

          return EMPTY;
        },
      ),
      map((res) => res.items),
    );
}

export default function recursiveApi(): void {
  fetchPaged()
    .pipe(
      tap((items: number[]) => {
        log('Inside tap per page:', items);
      }),
      reduce((acc, items) => [...acc, ...items]),
    )
    .subscribe((items: number[]) => {
      log('In the end:', items);
    });
}
