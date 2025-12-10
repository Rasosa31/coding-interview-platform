# AI Agent Instructions for Git Commands

This file contains instructions for AI assistants to help with Git operations for this project.

## Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: Coding interview platform"
```

### Creating a Repository on GitHub
1. Go to GitHub and create a new repository
2. Add the remote:
```bash
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

### Committing Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Description of changes"

# Push to remote
git push origin main
```

### Step-by-Step Commits (Recommended)
```bash
# Step 1: Initial implementation
git add .
git commit -m "Initial implementation: frontend and backend"

# Step 2: Add tests
git add .
git commit -m "Add integration tests"

# Step 3: Add syntax highlighting
git add .
git commit -m "Add syntax highlighting for JavaScript and Python"

# Step 4: Add code execution
git add .
git commit -m "Add code execution with Pyodide (WASM)"

# Step 5: Add Docker support
git add .
git commit -m "Add Dockerfile for containerization"

# Step 6: Update README
git add .
git commit -m "Update README with instructions"
```

### Useful Commands
```bash
# Check status
git status

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch back to main
git checkout main
```


