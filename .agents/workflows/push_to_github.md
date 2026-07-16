---
description: Push local Suba-Studios project to GitHub
---

1. **Initialize Git repository**
   ```bash
   git init
   ```

2. **Add all project files**
   ```bash
   git add .
   ```

3. **Create an initial commit**
   ```bash
   git commit -m "Initial commit"
   ```

4. **Create a new repository on GitHub**
   - Go to https://github.com and sign in.
   - Click **New** repository.
   - Name it (e.g., `Suba-Studios`).
   - Do **not** initialize with a README, .gitignore, or license (since you already have a local repo).
   - Click **Create repository**.

5. **Add the GitHub remote**
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/Suba-Studios.git
   ```
   Replace `<YOUR_USERNAME>` with your GitHub username.

6. **Push the code to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

7. **Verify**
   - Refresh the repository page on GitHub to see your files.

**Optional**: Set up a GitHub Actions workflow for CI/CD.

// turbo-all
```bash
# The above commands can be run sequentially in a terminal.
```
