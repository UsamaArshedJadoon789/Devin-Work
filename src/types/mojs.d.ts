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

  class Shape {
    constructor(options: ShapeOptions);
    play(): void;
    pause(): void;
    replay(): void;
    setSpeed(speed: number): void;
  }

  export { Shape };
  export default { Shape };
}
