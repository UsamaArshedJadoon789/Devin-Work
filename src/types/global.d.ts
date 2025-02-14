interface Window {
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
}

interface HTMLElementTagNameMap {
  div: HTMLDivElement;
  p: HTMLParagraphElement;
  h3: HTMLHeadingElement;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
