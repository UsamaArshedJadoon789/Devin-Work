declare module 'velocity-js' {
  interface VelocityOptions {
    duration?: number;
    easing?: string;
    queue?: boolean | string;
    begin?: Function;
    complete?: Function;
    progress?: Function;
    loop?: boolean | number;
    delay?: number;
    display?: string;
    visibility?: string;
    mobileHA?: boolean;
  }

  interface VelocityStatic {
    (element: Element | JQuery, properties: { [key: string]: any }, options?: VelocityOptions): any;
    (element: Element | JQuery, properties: { [key: string]: any }, duration?: number, easing?: string): any;
    (element: Element | JQuery, command: string): any;
  }

  const Velocity: VelocityStatic;
  export default Velocity;
}
