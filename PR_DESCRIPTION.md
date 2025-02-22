# Remove White Margins and Add Smooth Animations

This PR removes all white margins from the website edges and adds smooth animations to enhance the user experience.

## Changes Made
1. Layout & Margins:
   - Removed all `container` classes and replaced with `w-full`
   - Added consistent `px-8` padding for internal spacing
   - Removed margin and padding from root element
   - Disabled Tailwind container plugin
   - Extended backgrounds edge-to-edge

2. Animations & Transitions:
   - Added scroll-triggered animations with Intersection Observer
   - Added stagger animations to service cards (100ms delay)
   - Enhanced button hover effects with scale transform
   - Added smooth navigation menu hover effects
   - Improved client logo hover animations
   - Set consistent transition durations (300-500ms)

## Testing
- Verified all animations work smoothly
- Checked responsive behavior
- Confirmed no white margins on any viewport size
- Tested scroll animations trigger correctly
- Verified hover effects on all interactive elements

Link to Devin run: https://app.devin.ai/sessions/7b0225440e434967982d9a1947ea6629
Requested by: Usama
