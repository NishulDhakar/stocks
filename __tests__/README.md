# Unit Tests

This directory contains comprehensive unit tests for the trading dashboard application.

## Test Structure

- `components/` - Component tests
- `hooks/` - Custom hook tests
- `lib/` - Utility and constant tests
- `app/` - Page component tests
- `types/` - Type definition validation tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The test suite covers:

### Components
- **TradingViewWidget**: Rendering, props validation, memoization, edge cases
- **Navitems**: Navigation rendering, active state management, link attributes
- **userDropdown**: Dropdown functionality, user display, sign-out behavior

### Hooks
- **useTradingViewWidget**: Hook initialization, script injection, container management, cleanup

### Pages
- **Home Page**: Widget rendering, layout structure, configuration

### Constants
- **lib/constants**: All exported constants, widget configurations, type consistency

### Types
- **global.d.ts**: Type structure validation, type guards, optional fields

## Installation

To install the required testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/dom jest jest-environment-jsdom @types/jest
```

## Best Practices

1. Mock external dependencies (Next.js router, external scripts)
2. Test user interactions and component behavior
3. Validate props and state changes
4. Check accessibility features
5. Test edge cases and error handling