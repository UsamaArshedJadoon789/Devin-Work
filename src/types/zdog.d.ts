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

  interface ShapeOptions {
    addTo: Illustration;
    stroke: number;
    color: string;
    path?: Array<{ x: number; y: number }>;
    closed?: boolean;
  }

  class Shape {
    constructor(options: ShapeOptions);
  }

  class Illustration {
    constructor(options: IllustrationOptions);
    updateRenderGraph(): void;
    setRotation(rotation: { x: number; y: number; z: number }): void;
  }

  export { Illustration, Shape };
  export default { Illustration, Shape };
}
