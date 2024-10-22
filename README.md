# Playwright Test Automation Project

This project is built using [Playwright](https://playwright.dev/), a Node.js library that allows automated browser testing with a variety of browsers, including Chrome, Firefox, and WebKit. It enables testing in both headless and headed modes, along with the ability to generate detailed reports of test runs.

## Prerequisites

Before getting started, make sure you have the following tools installed:
- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

In the project directory, run the following command to install Playwright and other required packages:

npm install

Install Playwright browsers:

npx playwright install


## Running Tests

To run the tests in headless mode, use the following command:

npx playwright test --headless

To run the tests in Headed Mode (With UI), use the following command:

npx playwright test --ui

To run a Specific Test File, use the following command:

npx playwright test tests/example.spec.ts


## Generating Test Reports

Playwright generates detailed reports after test execution. To view and generate HTML reports, follow these steps:

Run the tests and generate the report:

npx playwright test --reporter=html

Once the tests are completed, open the report by running:

npx playwright show-report


## Project Structure

Here's a basic overview of the project structure:


├── tests/                  # Folder with test files

│   └── example.spec.ts      # Example test case

├── playwright.config.ts     # Playwright configuration file

├── package.json             # Project dependencies and scripts

└── README.md                # Project documentation






