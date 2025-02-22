declare module 'zdog' {
  interface IllustrationOptions {
    element: HTMLElement;
    dragRotate?: boolean;
    rotate?: {
      x: number;
      y: number;
      z: number;
    };
  }

  class Illustration {
    constructor(options: IllustrationOptions);
    updateRenderGraph(): void;
    setRotation(rotation: { x: number; y: number; z: number }): void;
  }

  export { Illustration };
  export default { Illustration };
}
