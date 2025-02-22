import { useSpring } from '@react-spring/web';

export const useHoverAnimation = () => {
  return useSpring({
    from: { scale: 1 },
    to: { scale: 1.05 },
    config: { tension: 300, friction: 10 }
  });
};
