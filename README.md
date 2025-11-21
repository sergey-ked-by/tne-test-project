# Playwright Test Automation Project

This project contains automated end-to-end tests using Playwright. It is structured to provide a clear and maintainable suite for web application testing.

## Technologies Used

*   **Playwright**: For reliable end-to-end testing.
*   **TypeScript**: For type-safe and robust test code.
*   **Node.js**: JavaScript runtime environment.

## Project Structure

*   `tests/`: Contains the test specifications.
*   `pages/`: Page Object Model implementations (using composition).
*   `panels/`: Reusable UI panels/components.
*   `fixtures/`: Playwright fixtures for test setup and page object initialization.
*   `models/`: TypeScript interfaces for data models.
*   `data/`: Test data objects.
*   `utils/`: Utility functions and helpers.
*   `configs/`: Project configurations.

## Architecture & Best Practices

This project follows modern Playwright best practices:
*   **Fixtures**: Page objects are initialized and provided via Playwright fixtures (`fixtures/pom.ts`), removing the need for manual instantiation in tests.
*   **Composition over Inheritance**: Page objects do not extend a base class. Shared functionality is handled via composition or utilities.
*   **Interfaces**: Data models are defined as TypeScript interfaces for better type safety and flexibility.

## Setup

To set up the project, follow these steps:

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Install Playwright browsers**:
    ```bash
    npx playwright install
    ```

## How to Run Tests

To run the tests, use the following commands:

*   **Run all tests**:
    ```bash
    npx playwright test
    ```
*   **Run tests in UI mode**:
    ```bash
    npx playwright test --ui
    ```
*   **Run a specific test file**:
    ```bash
    npx playwright test tests/login.test.ts
    ```
*   **Run tests with a specific project (e.g., Chromium)**:
    ```bash
    npx playwright test --project=chromium
    ```

## Reporting

Test results and reports are generated in the `test-results/` and `allure-results/` directories.
To view the Allure report:
```bash
allure generate allure-results --clean && allure open
```
