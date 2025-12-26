# Testing Documentation

This document describes the testing setup and practices for the Charades Generator application.

## Test Stack

- **Vitest** - Fast unit test framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment for tests

## Running Tests

### Run all tests once
```bash
npm test
```

### Watch mode (re-run on file changes)
```bash
npm run test:watch
```

### With UI (interactive test runner)
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Structure

```
src/
├── __tests__/
│   ├── components/       # Component tests
│   ├── hooks/            # Custom hook tests
│   ├── utils/            # Utility function tests
│   └── context/          # Context/reducer tests
└── test/
    └── setup.ts          # Test configuration
```

## Current Test Coverage

### Utilities (100% coverage)
- **Word Database** (`wordDatabase.test.ts`)
  - ✓ Category retrieval
  - ✓ Word fetching by category and difficulty
  - ✓ Word count validation (50+ per category/difficulty)
  - ✓ No duplicate words within difficulty levels

- **Audio Utils** (`audioUtils.test.ts`)
  - ✓ Time formatting (MM:SS)
  - ✓ Alarm sound generation

### Components
- **ResetButton** (`ResetButton.test.tsx`)
  - ✓ Button rendering
  - ✓ Dialog open/close functionality
  - ✓ Confirmation message display
  - ✓ Cancel and Reset button interactions

### Game Logic
- **Game Reducer** (`gameReducer.test.ts`)
  - ✓ Initial state validation
  - ✓ Team structure validation
  - ✓ Settings structure validation
  - ✓ Score calculation
  - ✓ Round management and team rotation

## Test Best Practices

### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    // Assert changes
  });
});
```

### 2. Hook Testing
For testing custom hooks, use `renderHook` from `@testing-library/react`:
```typescript
import { renderHook } from '@testing-library/react';

it('should use custom hook', () => {
  const { result } = renderHook(() => useMyHook());
  expect(result.current.value).toBe(expected);
});
```

### 3. Context Testing
Wrap components with providers when testing context-dependent components:
```typescript
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <GameProvider>{children}</GameProvider>
);

render(<MyComponent />, { wrapper: Wrapper });
```

### 4. Async Testing
Use `waitFor` for async operations:
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

## CI/CD Integration

Tests run automatically on:
- **Push to main branch**
- **Pull requests to main branch**

The GitHub Actions workflow:
1. Sets up Node.js (v18 and v20)
2. Installs dependencies
3. Runs linter
4. **Runs all tests**
5. Builds the application
6. Uploads build artifacts

## Mocks

### localStorage
Mocked in `src/test/setup.ts`:
```typescript
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
```

### Web Audio API
Mocked for timer alarm functionality:
```typescript
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn(),
  createGain: vi.fn(),
  // ...
}));
```

## Adding New Tests

### 1. Create test file
Place test files in `src/__tests__/` following the directory structure:
```
src/
├── components/MyComponent.tsx
└── __tests__/
    └── components/
        └── MyComponent.test.tsx
```

### 2. Follow naming convention
- Test files: `*.test.ts` or `*.test.tsx`
- Test suites: Use `describe()` blocks
- Test cases: Use `it()` or `test()`

### 3. Example test template
```typescript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  describe('Specific Functionality', () => {
    it('should do something specific', () => {
      // Arrange
      const input = setupInput();

      // Act
      const result = performAction(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

## Future Testing Improvements

1. **Increase Coverage**
   - Add tests for GameSetup component
   - Add tests for Countdown component
   - Add tests for ActiveRound component
   - Add tests for GameSummary component

2. **Integration Tests**
   - Test complete game flow from setup to summary
   - Test localStorage persistence
   - Test word selection and no-repeat logic

3. **E2E Tests**
   - Consider adding Playwright or Cypress for full user journey tests
   - Test multi-round gameplay
   - Test team switching and scoring

4. **Performance Tests**
   - Test timer accuracy
   - Test word database load times
   - Test rendering performance with large team counts

## Troubleshooting

### Tests failing locally but passing in CI
- Check Node.js version matches CI (18.x or 20.x)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Material-UI warnings about `act()`
- These are expected for MUI components with animations
- Use `waitFor` for async state updates
- The warnings don't indicate test failures

### Coverage not generating
- Ensure `@vitest/coverage-v8` is installed
- Run `npm run test:coverage`
- Check `coverage/` directory for HTML report

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
