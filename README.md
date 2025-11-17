# Playwright Test Automation Project

This project contains automated end-to-end tests using Playwright. It is structured to provide a clear and maintainable suite for web application testing.

## Technologies Used

*   **Playwright**: For reliable end-to-end testing.
*   **TypeScript**: For type-safe and robust test code.
*   **Node.js**: JavaScript runtime environment.

## Project Structure

*   `tests/`: Contains the test specifications.
*   `pages/`: Page Object Model implementations for interacting with web pages.
*   `models/`: Data models used within the tests.
*   `data/`: Test data.
*   `utils/`: Utility functions and helpers.
*   `configs/`: Project configurations.

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
