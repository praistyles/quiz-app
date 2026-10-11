# Frontend Mentor - Frontend quiz app solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Getting started](#getting-started)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![](./screenshot.jpg)

_Add a screenshot of your solution and update the path above if needed._

### Links

- Solution URL: [https://github.com/praistyles/quiz-app](https://github.com/praistyles/quiz-app)
- Live Site URL: [https://praistyles.github.io/quiz-app/](https://praistyles.github.io/quiz-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties for theming
- Flexbox and CSS Grid
- Mobile-first responsive layout
- [React](https://react.dev/) — UI library
- [Vite](https://vite.dev/) — build tool and dev server
- Local quiz data from `public/data.json`

### What I learned

- Managing multi-screen quiz flow in React with shared state (`menu` → `quiz` → `results`)
- Handling submit validation, score tracking, and correct/incorrect feedback
- Implementing light/dark mode with `data-theme`, CSS variables, and `localStorage`
- Keeping the UI keyboard-accessible with focus styles and semantic buttons

### Continued development

- Split screens into separate components for clearer structure
- Add unit tests for quiz scoring and submit validation
- Tighten visual match against the Figma design (spacing, type scale, hover states)

### Useful resources

- [MDN — Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — theming with variables
- [React docs — Managing state](https://react.dev/learn/managing-state) — structuring quiz state
- [Vite guide](https://vite.dev/guide/) — project setup and static assets in `public/`

### AI Collaboration

- Used Cursor to scaffold the Vite + React app and implement the quiz flow, styles, and theme toggle
- Iterated on layout, accessibility, and challenge requirements with AI assistance

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173/`).

```bash
npm run build    # production build
npm run preview  # preview the production build
```

## Author

- GitHub - [@praistyles](https://github.com/praistyles)
- Frontend Mentor - [@praistyles](https://www.frontendmentor.io/profile/praistyles)
