/**
 * Puppeteer Test Scenarios for Speedy Maths Games
 * Use these scenarios with the Puppeteer MCP server for automated testing
 */

// Test configuration
const BASE_URL = 'https://benixmaxedis.github.io/smi-legacy/';
const GAMES = {
  landing: '',
  pixi: 'speedy-maths-pixi.html',
  canvas: 'smi-legacy.html'
};

/**
 * Landing Page Test Scenarios
 */
const landingPageTests = {
  // Test 1: Verify landing page loads and displays correctly
  async testLandingPageLoad(page) {
    await page.goto(BASE_URL);
    await page.waitForSelector('h1');
    
    const title = await page.$eval('h1', el => el.textContent);
    console.log('Page title:', title);
    
    // Check for game cards
    const gameCards = await page.$$('.game-card');
    console.log(`Found ${gameCards.length} game cards`);
    
    return {
      success: gameCards.length >= 2,
      title,
      gameCount: gameCards.length
    };
  },

  // Test 2: Test navigation to different games
  async testGameNavigation(page) {
    await page.goto(BASE_URL);
    
    // Test PIXI.js version link
    const pixiButton = await page.$('a[href="speedy-maths-pixi.html"]');
    if (pixiButton) {
      await pixiButton.click();
      await page.waitForNavigation();
      const url = page.url();
      console.log('Navigated to PIXI version:', url);
    }
    
    // Go back and test Canvas version
    await page.goto(BASE_URL);
    const canvasButton = await page.$('a[href="smi-legacy.html"]');
    if (canvasButton) {
      await canvasButton.click();
      await page.waitForNavigation();
      const url = page.url();
      console.log('Navigated to Canvas version:', url);
    }
    
    return { success: true };
  }
};

/**
 * PIXI.js Game Test Scenarios
 */
const pixiGameTests = {
  // Test 1: Game initialization and audio setup
  async testGameInitialization(page) {
    await page.goto(BASE_URL + GAMES.pixi);
    
    // Wait for game to load
    await page.waitForSelector('canvas', { timeout: 10000 });
    
    // Check if game variables are initialized
    const gameState = await page.evaluate(() => {
      return {
        canvasExists: !!document.querySelector('canvas'),
        pixiAppExists: typeof app !== 'undefined',
        audioInitialized: typeof audioInitialized !== 'undefined' ? audioInitialized : false,
        gameRunning: typeof gameRunning !== 'undefined' ? gameRunning : false
      };
    });
    
    console.log('Game initialization state:', gameState);
    return gameState;
  },

  // Test 2: Audio system test
  async testAudioSystem(page) {
    await page.goto(BASE_URL + GAMES.pixi);
    await page.waitForSelector('canvas');
    
    // Test audio initialization
    const audioTest = await page.evaluate(async () => {
      // Allow audio context
      if (typeof Tone !== 'undefined' && Tone.context.state === 'suspended') {
        await Tone.start();
      }
      
      return {
        toneJsAvailable: typeof Tone !== 'undefined',
        contextState: typeof Tone !== 'undefined' ? Tone.context.state : 'unknown',
        backgroundMusicExists: typeof backgroundMusic !== 'undefined',
        soundsExists: typeof sounds !== 'undefined'
      };
    });
    
    console.log('Audio system state:', audioTest);
    return audioTest;
  },

  // Test 3: Game controls and interaction
  async testGameControls(page) {
    await page.goto(BASE_URL + GAMES.pixi);
    await page.waitForSelector('canvas');
    
    // Get initial game state
    const initialState = await page.evaluate(() => {
      return {
        playerExists: typeof player !== 'undefined',
        gameStarted: typeof gameRunning !== 'undefined' ? gameRunning : false
      };
    });
    
    if (initialState.playerExists) {
      // Test keyboard controls
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      await page.keyboard.press('Space');
      
      console.log('Keyboard controls tested');
    }
    
    return { success: true, ...initialState };
  },

  // Test 4: Performance monitoring
  async testPerformance(page) {
    await page.goto(BASE_URL + GAMES.pixi);
    await page.waitForSelector('canvas');
    
    // Monitor performance for 5 seconds
    const startTime = Date.now();
    await page.waitForTimeout(5000);
    
    const metrics = await page.metrics();
    const memoryUsage = await page.evaluate(() => {
      return performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      } : null;
    });
    
    const result = {
      duration: Date.now() - startTime,
      metrics,
      memoryUsage
    };
    
    console.log('Performance test results:', result);
    return result;
  }
};

/**
 * Canvas Game Test Scenarios
 */
const canvasGameTests = {
  // Test 1: Canvas rendering test
  async testCanvasRendering(page) {
    await page.goto(BASE_URL + GAMES.canvas);
    await page.waitForSelector('canvas');
    
    const canvasState = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const ctx = canvas ? canvas.getContext('2d') : null;
      
      return {
        canvasExists: !!canvas,
        contextExists: !!ctx,
        canvasWidth: canvas ? canvas.width : 0,
        canvasHeight: canvas ? canvas.height : 0,
        gameInitialized: typeof gameLoop !== 'undefined'
      };
    });
    
    console.log('Canvas state:', canvasState);
    return canvasState;
  },

  // Test 2: Game loop functionality
  async testGameLoop(page) {
    await page.goto(BASE_URL + GAMES.canvas);
    await page.waitForSelector('canvas');
    
    // Monitor game loop for frame updates
    const frameTest = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        const startTime = Date.now();
        
        const originalRequestAnimationFrame = window.requestAnimationFrame;
        window.requestAnimationFrame = function(callback) {
          frameCount++;
          if (frameCount >= 60) { // Monitor for 60 frames
            const duration = Date.now() - startTime;
            const fps = frameCount / (duration / 1000);
            resolve({ frameCount, duration, fps });
            window.requestAnimationFrame = originalRequestAnimationFrame;
          }
          return originalRequestAnimationFrame(callback);
        };
        
        // Timeout after 5 seconds
        setTimeout(() => {
          const duration = Date.now() - startTime;
          const fps = frameCount / (duration / 1000);
          resolve({ frameCount, duration, fps, timeout: true });
        }, 5000);
      });
    });
    
    console.log('Frame rate test:', frameTest);
    return frameTest;
  }
};

/**
 * Cross-browser and responsive testing
 */
const responsiveTests = {
  // Test different viewport sizes
  async testResponsiveDesign(page) {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1366, height: 768, name: 'Desktop Standard' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    const results = [];
    
    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await page.goto(BASE_URL);
      
      // Take screenshot for visual verification
      const screenshot = await page.screenshot({
        path: `tests/screenshots/landing-${viewport.name.toLowerCase().replace(' ', '-')}.png`
      });
      
      // Check layout
      const layoutTest = await page.evaluate(() => {
        const gameCards = document.querySelectorAll('.game-card');
        const playButtons = document.querySelectorAll('.play-button');
        
        return {
          gameCardsVisible: gameCards.length > 0,
          buttonsClickable: playButtons.length > 0,
          noHorizontalScroll: document.body.scrollWidth <= window.innerWidth
        };
      });
      
      results.push({
        viewport: viewport.name,
        ...layoutTest,
        screenshotTaken: true
      });
    }
    
    console.log('Responsive design test results:', results);
    return results;
  }
};

module.exports = {
  landingPageTests,
  pixiGameTests,
  canvasGameTests,
  responsiveTests,
  BASE_URL,
  GAMES
};