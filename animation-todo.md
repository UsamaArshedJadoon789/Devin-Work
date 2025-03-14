# Animation Implementation Todo List

## Components to Animate

1. Hero Section
   - Three.js: Animated background with rotating sphere and stars
   - Mo.js: Burst effects on button clicks
   - Velocity.js: Smooth transitions for text and buttons

2. Services Section
   - Three.js: Floating particles around service cards
   - Mo.js: Interactive burst effects on card hover
   - Velocity.js: Card hover animations and transitions

3. FAQ Section
   - Mo.js: Click effects on accordion toggles
   - Velocity.js: Smooth accordion animations

4. Testimonials Section
   - Three.js: Animated background elements
   - Mo.js: Testimonial transition effects
   - Velocity.js: Smooth carousel transitions

## Cleanup Tasks
1. Remove unused animation libraries:
   - Remove Anime.js
   - Remove Remotion
   - Remove React Move
   - Remove Reanimated
   - Remove React Reveal
   - Remove Popmotion
   - Remove Zdog

2. Update package.json to keep only:
   - Three.js (@react-three/fiber, @react-three/drei)
   - Mo.js
   - Velocity.js
