export function scrollToBottom(
  element: HTMLElement,
  behavior: ScrollBehavior = "smooth"
): void {
  element.scrollTo({
    top: element.scrollHeight,
    behavior,
  });
}

export function isNearBottom(element: HTMLElement, threshold = 100): boolean {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return scrollHeight - scrollTop - clientHeight < threshold;
}
