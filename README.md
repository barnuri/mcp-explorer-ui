# MCP Explorer UI

an open-source web application for exploring and visualizing the MCP Servers.

# Run
```bash
npm i
#export CONFIG_PATH=./config.json
#export CONFIG_PATH=https://example/config.json
npm run dev
```

# Deploy to GitHub Pages

To deploy the project to GitHub Pages, follow these steps:

1. Ensure you have the necessary permissions to push to the `gh-pages` branch of the repository.
2. Create a new GitHub Actions workflow file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - '**'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

3. Commit and push the changes to the repository.
4. The GitHub Actions workflow will automatically build and deploy the project to GitHub Pages whenever changes are pushed to the `main` branch or a pull request is created.

You can also manually deploy the project by running the following command:

```bash
npm run deploy
```
