declare module 'react-reveal/Fade' {
  import { ComponentType, ReactNode } from 'react';

  export interface RevealProps {
    children: ReactNode;
    cascade?: boolean;
    fraction?: number;
    duration?: number;
    delay?: number;
    count?: number;
    forever?: boolean;
    exit?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    when?: boolean;
    spy?: any;
    collapse?: boolean;
    force?: boolean;
    appear?: boolean;
    enter?: boolean;
    style?: object;
    className?: string;
    effect?: string;
  }

  const Fade: ComponentType<RevealProps>;
  export default Fade;
}
