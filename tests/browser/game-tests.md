# Browser Testing Guide for Speedy Maths Games

This document outlines how to use the Puppeteer MCP server to test the educational space shooter games.

## Available Test Scenarios

### 1. Landing Page Tests
- ✅ Verify landing page loads correctly
- ✅ Check game selection buttons are present and clickable
- ✅ Validate responsive design on different screen sizes
- ✅ Test navigation to different game versions

### 2. PIXI.js Enhanced Version Tests
- 🎮 Game initialization and loading
- 🎵 Audio system initialization (80's arcade music)
- 🚀 Player ship controls and movement
- 🎯 Shooting mechanics (plasma bolts and answer missiles)
- 🧮 Math problem generation and validation
- 📊 Statistics tracking and display
- 🛡️ Weapon upgrade system functionality

### 3. Original Canvas Version Tests
- 🎮 Game startup and canvas rendering
- 🚀 Basic player movement and controls
- 🎯 Shooting and collision detection
- 🧮 Math education features
- 📈 Difficulty progression

### 4. Cross-Browser Compatibility
- Chrome/Chromium testing
- Firefox compatibility (if supported)
- Mobile viewport testing
- Performance benchmarking

## Sample Test Commands

### Basic Navigation Test
```javascript
// Navigate to landing page
await page.goto('https://benixmaxedis.github.io/smi-legacy/');

// Verify page title
const title = await page.title();
assert(title.includes('Speedy Maths'));

// Click on Enhanced PIXI.js version
await page.click('a[href="speedy-maths-pixi.html"]');
await page.waitForSelector('canvas');
```

### Game Interaction Test
```javascript
// Wait for game to load
await page.waitForFunction(() => window.gameInitialized === true);

// Test audio initialization
await page.evaluate(() => {
    if (window.audioInitialized) {
        window.backgroundMusic.start();
    }
});

// Simulate keyboard controls
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowRight');
await page.keyboard.press('Space');
```

### Performance Testing
```javascript
// Monitor FPS and performance
const metrics = await page.metrics();
console.log('Performance metrics:', metrics);

// Check memory usage
const jsHeapUsedSize = await page.evaluate(() => performance.memory.usedJSHeapSize);
console.log('Memory usage:', jsHeapUsedSize);
```

## Test Data Collection

### Metrics to Track
- Page load times
- Game initialization duration
- Frame rates during gameplay
- Audio latency
- User interaction responsiveness
- Memory usage patterns
- Error rates

### Educational Metrics
- Math problem difficulty progression
- Answer accuracy tracking
- Learning curve analysis
- Engagement duration

## Automated Test Scenarios

### Smoke Tests (Quick validation)
1. All pages load without errors
2. Basic game functionality works
3. Audio systems initialize
4. No JavaScript console errors

### Integration Tests
1. Full gameplay session simulation
2. Math problem solving workflow
3. Weapon upgrade progression
4. Statistics persistence

### Regression Tests
1. Compare performance with baseline
2. Validate new features don't break existing ones
3. Cross-browser compatibility checks
4. Mobile responsiveness validation

## Usage Notes

- Tests run against the live GitHub Pages deployment
- Use headless mode for CI/CD integration
- Screenshots and videos can be captured for debugging
- Performance profiles can be generated for optimization