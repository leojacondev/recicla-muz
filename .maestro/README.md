# Maestro E2E Tests - ReciclaMuz

End-to-End testing suite for the ReciclaMuz mobile application using Maestro.

## About Maestro

Maestro is a simple, effective mobile UI testing framework that works seamlessly with React Native and Expo applications. Tests are written in YAML format, making them easy to read, write, and maintain.

## Installation

### Install Maestro CLI

**macOS/Linux:**
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**Windows:**
```bash
# Using WSL (Windows Subsystem for Linux)
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Verify installation:
```bash
maestro --version
```

## Running Tests

### Prerequisites

1. Start the Expo development server:
```bash
npm start
```

2. Ensure your app is running on a simulator/emulator or physical device

### Run All Tests

```bash
maestro test .maestro/
```

### Run Individual Tests

```bash
# App Launch Test
maestro test .maestro/app-launch.yaml

# Navigation Test
maestro test .maestro/navigation.yaml

# Login Flow Test
maestro test .maestro/login-flow.yaml

# Cookie Consent Test
maestro test .maestro/cookie-consent.yaml

# Policies Navigation Test
maestro test .maestro/policies-navigation.yaml
```

### Run Tests with Recording

```bash
maestro test --format junit .maestro/app-launch.yaml
```

## Test Suite Overview

### 1. App Launch (`app-launch.yaml`)
**Purpose:** Verify app launches successfully and displays home screen
**Coverage:**
- App launches without crashes
- Home screen renders correctly
- Main title and subtitle are visible
- Key sections are present

### 2. Navigation (`navigation.yaml`)
**Purpose:** Test bottom tab navigation functionality
**Coverage:**
- All bottom tabs are accessible
- Tab switching works correctly
- Each screen displays expected content
- Navigation state is maintained

### 3. Login Flow (`login-flow.yaml`)
**Purpose:** Verify login screen and authentication options
**Coverage:**
- Login screen displays correctly
- Google login option is present
- GitHub login option is present
- Back navigation works
- Terms and privacy links are visible

### 4. Cookie Consent (`cookie-consent.yaml`)
**Purpose:** Test cookie consent banner functionality
**Coverage:**
- Banner appears on first launch
- Accept button is functional
- Banner dismisses after acceptance
- Preferences are saved

### 5. Policies Navigation (`policies-navigation.yaml`)
**Purpose:** Verify policy pages are accessible
**Coverage:**
- Terms of Use page opens
- Privacy Policy page opens
- Cookie Policy page opens
- Back navigation works correctly
- Content displays properly

## Test Structure

Each test follows this general structure:

```yaml
appId: com.anonymous.reciclamuz
---
# Test: <Test Name>
# <Test Description>

- launchApp
- assertVisible: "Expected Text"
- tapOn: "Button Text"
# ... more test steps
```

## Best Practices

1. **Keep Tests Independent**: Each test should be able to run independently
2. **Use Descriptive Names**: Test file names should clearly indicate what's being tested
3. **Add Comments**: Include comments explaining complex test steps
4. **Assert Early and Often**: Verify state at each important step
5. **Clean Up**: Return to a known state at the end of each test

## Debugging Failed Tests

When a test fails, Maestro provides:
- Screenshot of the failure point
- Step-by-step execution log
- Error details

To debug:
```bash
maestro test --debug-output debug-output/ .maestro/failing-test.yaml
```

## CI/CD Integration

To run Maestro tests in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run E2E Tests
  run: |
    maestro test .maestro/
```

## Writing New Tests

1. Create a new `.yaml` file in `.maestro/` directory
2. Follow the naming convention: `feature-name.yaml`
3. Start with `appId: com.anonymous.reciclamuz`
4. Add descriptive comments
5. Write test steps using Maestro commands
6. Test locally before committing

## Common Maestro Commands

- `launchApp` - Launch the application
- `assertVisible: "text"` - Check if text is visible
- `tapOn: "text"` - Tap on element with text
- `scrollDown` - Scroll down on current screen
- `inputText: "text"` - Input text into focused field
- `pressKey: Back` - Press hardware back button
- `takeScreenshot` - Capture screenshot

## Resources

- [Maestro Documentation](https://maestro.mobile.dev/)
- [Maestro GitHub](https://github.com/mobile-dev-inc/maestro)
- [React Native Testing Guide](https://reactnative.dev/docs/testing-overview)

## Support

For issues or questions about E2E tests, contact the development team:
- Anderson Henrique da Silva
- Leonardo Jacon dos Reis
- Lurian Letícia dos Reis
