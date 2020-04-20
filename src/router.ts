import { BehaviorSubject, Observable } from 'rxjs';
import { clearBody } from './helpers';

type RouteCallback = () => void;

type Routes = Map<string, RouteCallback>;

export const routes$ = new BehaviorSubject<Routes>(new Map());

export function addRoute(name: string, cb: RouteCallback): Observable<Routes> {
  const nextRoutes = routes$.getValue();

  if (!nextRoutes.get(name)) {
    nextRoutes.set(name, cb);

    routes$.next(nextRoutes);
  }

  return routes$;
}

export function renderPage(): void {
  clearBody();

  const page = window.location.pathname;

  const currentRoutes = routes$.getValue();

  if (currentRoutes.has(page)) {
    currentRoutes.get(page)();
  } else {
    currentRoutes.get('/')();
    throw new Error(`${page} not found`);
  }
}
