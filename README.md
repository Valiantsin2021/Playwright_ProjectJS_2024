# Playwright_ProjectJS_2024

This project is a Playwright-based testing framework for the Magento software testing board.

## Prerequisites

- Node.js (version 22 or higher)
- npm (version 9 or higher)
- Docker (optional, for running tests in a containerized environment)

## Project Setup

1. **Clone the repository to your machine:**
   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project root folder:**
   ```sh
   cd Playwright_ProjectJS_2024
   ```

3. **Install dependencies:**
   ```sh
   npm ci
   ```

4. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

## Running Tests

### Locally

1. **Run tests:**
   ```sh
   npm run test
   ```

2. **Generate test report:**
   ```sh
   npm run report
   ```
3. View the test report: https://valiantsin2021.github.io/Playwright_ProjectJS_2024
### Using Docker

1. **Build and run Docker container:**
   ```sh
   docker build -t playwright .
   docker run -it --rm -v ${PWD}:/tests playwright
   ```

## Additional Commands

- **Clean reports and downloads folders:**
  ```sh
  npm run clean
  ```

- **Format the code:**
  ```sh
  npm run format
  ```

- **Lint the code:**
  ```sh
  npm run lint
  ```

## Important Notes

- **Attention!** Students are not allowed to install any libraries, plugins, etc., to avoid changing configuration files.
- Ensure you have the necessary permissions to run Docker commands if you choose to use Docker.

## Project Structure

- **/tests**: Contains all test files.
- **/page_objects**: Contains page objects for the project.
- **/helpers**: Contains utilities and constants for the project.
- **/report**: Contains generated test reports.

## Contributing

If you wish to contribute to this project, please follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Author

Valentin Lutchanka