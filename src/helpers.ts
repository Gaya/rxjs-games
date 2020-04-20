export function clearChildren(element: HTMLElement): void {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

export function clearBody(): void {
  clearChildren(document.body);
}
