# Testing Quick Reference

## 🚀 Quick Testing Commands

### Run All Tests
```bash
# Automated CI tests (comprehensive)
gh workflow run browser-tests.yml

# Check test results
gh run list --limit 3
```

### Manual Testing with Claude Code
Use the Puppeteer MCP server with these commands:

```javascript
// Basic page load test
await page.goto('https://benixmaxedis.github.io/smi-legacy/');
const title = await page.title();
console.log('Page loaded:', title);

// Test game navigation
await page.click('a[href="speedy-maths-pixi.html"]');
await page.waitForSelector('canvas');
console.log('Game canvas loaded');

// Memory usage check
const memory = await page.evaluate(() => performance.memory.usedJSHeapSize);
console.log('Memory usage:', Math.round(memory / 1024 / 1024) + 'MB');
```

## 🔍 Bug Detection Checklist

### Critical Bug Patterns
```bash
# Search for array modification during iteration
grep -n "forEach.*splice" *.html

# Look for undefined function calls  
grep -n "checkLevelTransition()" *.html

# Find missing error handling
grep -L "try.*catch\|Error" *.html
```

### Performance Issues
```bash
# Find nested loops (O(n²) complexity)
grep -n "forEach.*forEach" *.html

# Look for memory leak patterns
grep -n "new.*Synth.*setTimeout" *.html
```

## 📊 Testing Metrics

### Performance Thresholds
- **Load Time**: < 3 seconds
- **FPS**: > 30 during gameplay
- **Memory**: < 50MB increase over 10 minutes
- **Critical Bugs**: 0 in production

### Test Coverage Goals
- ✅ Functional: 90% features tested
- ✅ Performance: Memory/FPS measured
- ✅ Cross-browser: Chrome/Firefox/Safari
- ✅ Responsive: Mobile/Tablet/Desktop

## 🎯 Issue Priorities

### 🔴 Critical (Fix Immediately)
- Game-breaking bugs
- Complete feature failures
- Level progression issues
- Collision detection failures

### 🟠 Performance (Fix Soon)  
- Memory leaks
- FPS degradation
- Load time issues
- Scalability problems

### 🟡 Quality (Fix When Possible)
- Missing error handling
- Code quality issues
- User experience improvements
- Accessibility enhancements

## 📋 Testing Workflow

1. **Run automated tests** via GitHub Actions
2. **Check for regressions** in latest deployment
3. **Perform manual testing** for new features
4. **Create issues** for any bugs found
5. **Verify fixes** before closing issues
6. **Update documentation** as needed

## 🔗 Quick Links

- [Comprehensive Testing Guide](comprehensive-testing-guide.md)
- [Test Scenarios](test-scenarios.js)
- [GitHub Issues](https://github.com/benixmaxedis/smi-legacy/issues)
- [Live Games](https://benixmaxedis.github.io/smi-legacy/)
- [CI/CD Pipeline](https://github.com/benixmaxedis/smi-legacy/actions)