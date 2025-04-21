# CURATOR - GitHub Pages Deployment Instructions

This document provides instructions for deploying CURATOR to GitHub Pages.

## How to Deploy

1. **Create a GitHub Repository**

   Create a new repository on GitHub and push your code to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/curator.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select the branch to deploy from (usually "main")
   - Select the folder to deploy from (usually "/ (root)")
   - Click "Save"

3. **Configure Repository Secrets**

   No secrets are needed for basic deployment. If you plan to implement the Google Cloud deployment, you'll need to add the GCP-related secrets.

## GitHub Actions Workflows

This repository includes two GitHub Actions workflows:

1. **github-pages.yml** - Deploys the static version of the site to GitHub Pages
2. **deploy.yml** - Template for deploying to Google Cloud (not used by default)

## Accessing the Site

Once deployed, your site will be available at:
`https://yourusername.github.io/curator/`

## Features Modified for Static Hosting

Since GitHub Pages only hosts static content, some features have been modified:

1. **API Endpoints**: Static JSON files are used to simulate API responses
2. **Form Submissions**: Simulated on the client side
3. **Demo Recognition**: Works using the same simulation logic as the original

## Development vs. Deployment

When developing locally:
- The site interacts with the Express backend API
- Form submissions are processed server-side
- API responses come from the server

When deployed to GitHub Pages:
- The site uses static JSON files for API data
- Form submissions are simulated client-side
- Special routing is implemented to handle GitHub Pages URL structure 