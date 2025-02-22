declare module 'remotion' {
  import { ComponentType } from 'react';

  interface SequenceProps {
    from: number;
    durationInFrames: number;
    children: React.ReactNode;
  }

  interface CompositionProps {
    id: string;
    component: ComponentType;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
  }

  export const Sequence: ComponentType<SequenceProps>;
  export const Composition: ComponentType<CompositionProps>;
}
