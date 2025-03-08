declare module 'mojs' {
  interface ShapeOptions {
    left?: number;
    top?: number;
    scale?: number | { [key: string]: number };
    duration?: number;
    easing?: string;
    shape?: string;
    fill?: string;
    radius?: number | { [key: string]: number };
    opacity?: number | { [key: string]: number };
    count?: number;
    children?: ShapeOptions;
    angle?: number | { [key: string]: number };
  }

  interface BurstOptions extends ShapeOptions {
    radius?: { [key: string]: number };
    count?: number;
    children?: {
      shape?: string;
      radius?: { [key: string]: number };
      fill?: string;
      scale?: { [key: string]: number };
      duration?: number;
      easing?: string;
    };
  }

  class Shape {
    constructor(options: ShapeOptions);
    play(): void;
    pause(): void;
    replay(): void;
    setSpeed(speed: number): void;
  }

  class Burst {
    constructor(options: BurstOptions);
    play(): void;
    pause(): void;
  }

  const mojs: {
    Shape: typeof Shape;
    Burst: typeof Burst;
  };

  export { Shape, Burst };
  export default mojs;
}
