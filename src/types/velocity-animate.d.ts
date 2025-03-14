declare module 'velocity-animate' {
  function velocity(
    element: HTMLElement | HTMLElement[],
    properties: { [key: string]: any },
    options?: {
      duration?: number;
      easing?: string | number[];
      queue?: string | false;
      begin?: Function;
      complete?: Function;
      progress?: Function;
      loop?: boolean | number;
      delay?: number;
      display?: string;
      visibility?: string;
      [key: string]: any;
    }
  ): any;

  export = velocity;
}
