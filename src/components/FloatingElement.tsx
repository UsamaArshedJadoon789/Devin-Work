import { useSpring, animated } from '@react-spring/web';
import * as React from 'react';

export interface FloatingElementProps {
  children: React.ReactNode;
  offset?: number;
  duration?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  offset = -10,
  duration = 2000 
}) => {
  const animation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: `translateY(${offset}px)` },
    config: { duration },
    loop: { reverse: true }
  });

  return <animated.div style={animation}>{children}</animated.div>;
};
