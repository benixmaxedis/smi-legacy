# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational space shooter game with multiple implementations exploring different web game development approaches. The project combines math education with engaging gameplay across three different rendering technologies.

## Architecture

### Multiple Game Implementations

The project contains three distinct implementations of the same educational game concept:

1. **`smi-legacy.html`** - Original HTML5 Canvas implementation (~1,700 lines)
   - Pure vanilla JavaScript with HTML5 Canvas API
   - Single-file monolithic structure
   - Direct pixel manipulation and manual draw loops

2. **`speedy-maths-pixi.html`** - Enhanced PIXI.js version (~29,000+ lines)
   - PIXI.js 7.2.4 for WebGL-accelerated 2D rendering
   - Container-based scene graph architecture
   - Advanced features: dynamic weapon system, shop/upgrades, comprehensive statistics

3. **`phaser-invasion-game/`** - Phaser.js prototype
   - Phaser 3.70.0 framework with scene-based architecture
   - Built-in physics engine and asset management
   - Smaller implementation focusing on framework exploration

### Audio Architecture

All implementations use **Tone.js 14.8.49** for procedural audio generation:
- Dynamic sound synthesis for game effects
- Multi-layered orchestral music system (currently Game of Thrones-inspired)
- Procedural sequence generation with tempo adjustment based on gameplay

### Game Engine Pattern

Consistent game loop pattern across implementations:
```javascript
function gameLoop() {
    if (gameRunning) {
        update();  // Game logic
        draw();    // Rendering
        requestAnimationFrame(gameLoop);
    }
}
```

## Development Commands

### Running the Game
```bash
# No build process required - open directly in browser
open smi-legacy.html          # Original Canvas version
open speedy-maths-pixi.html   # Enhanced PIXI.js version
open phaser-invasion-game/index.html  # Phaser version
```
### Pixi.js documentation

Read these instructions on how to use the pixi.js library
https://pixijs.com/llms.txt
https://pixijs.com/llms-full.txt
https://pixijs.com/llms-medium.txt


### Development Workflow
- **No bundling or compilation** - all implementations are single-file HTML documents
- **CDN-based dependencies** - no local package management
- **Direct browser testing** - no development server required
- **Console logging** used for debugging

### GitHub Integration
```bash
gh issue list                 # View issues
gh issue create              # Create new issues (requires repo scope)
```

### Browser Testing with Puppeteer MCP

This project includes automated browser testing using Puppeteer through the MCP (Model Context Protocol) server.

#### MCP Server Configuration
The Puppeteer MCP server is configured in `mcp.json` and provides browser automation capabilities for testing the educational games.

#### Available Test Scenarios
- **Landing Page Tests**: Navigation, responsiveness, game selection
- **PIXI.js Game Tests**: Initialization, audio system, controls, performance
- **Canvas Game Tests**: Rendering, game loop, frame rates
- **Cross-browser Testing**: Multiple viewports, responsive design
- **Performance Monitoring**: Memory usage, load times, FPS tracking

#### Running Tests
```bash
# Manual testing with Claude Code (requires Puppeteer MCP server)
# Use the test scenarios in tests/browser/test-scenarios.js

# Automated CI testing
# Tests run automatically on push/PR via GitHub Actions
gh workflow run browser-tests.yml
```

#### Test Files Structure
```
tests/
├── browser/
│   ├── game-tests.md          # Testing documentation
│   ├── test-scenarios.js      # Reusable test functions
│   └── screenshots/           # Generated screenshots
└── .github/workflows/
    └── browser-tests.yml      # Automated CI testing
```

#### Testing Features
- **Smoke Tests**: Basic functionality validation
- **Performance Tests**: Memory usage, load times, FPS
- **Responsive Tests**: Multiple device viewports
- **Audio Tests**: Tone.js and 80's arcade music validation
- **Error Detection**: JavaScript console error monitoring

## Key Technical Patterns

### Entity Management
- Array-based entity storage for game objects
- Filter-based lifecycle management
- Distance-based collision detection

### Educational Framework
- **Progressive difficulty scaling** based on player performance
- **Operation-specific enemy types** with color coding (addition=green, subtraction=red, multiplication=purple, division=orange)
- **Adaptive math problem generation** with increasing complexity
- **Statistics tracking** for learning analytics

### Rendering Approaches
- **Canvas**: Direct 2D API calls with immediate mode rendering
- **PIXI.js**: Container hierarchy with sprite-based management and WebGL acceleration
- **Phaser**: Scene-based structure with built-in physics and asset management

## Code Organization

### PIXI.js Implementation Structure
```javascript
// Container hierarchy for organized rendering
backgroundContainer = new PIXI.Container();
gameObjectsContainer = new PIXI.Container();
particleContainer = new PIXI.Container();
uiContainer = new PIXI.Container();
```

### Dual Combat System
- **Plasma bolts** for formation enemies (mouse hold)
- **Answer missiles** for math enemies (type answer + right-click)

### Audio System Integration
All sound effects are procedurally generated using Tone.js synthesis rather than audio files.

## Dependencies

### External Libraries (CDN-loaded)
- **Tone.js 14.8.49** - Web Audio framework for all audio
- **PIXI.js 7.2.4** - 2D WebGL renderer (PIXI version only)
- **Phaser 3.70.0** - Game framework (Phaser version only)

### No Local Dependencies
- No package.json or node_modules
- No build tools or bundlers
- No local development server required

## File Structure Notes

- Each implementation is self-contained in a single HTML file
- The Phaser version uses separate JS files but still requires no build process
- All game logic, rendering, and styling are embedded within each HTML file
- Version control is handled through file naming rather than branching