# Recipe App - Angular Frontend

A modern, pastel-themed Angular application for recipe sharing with a beautiful UI built using Angular Material and custom SCSS architecture.

Readme written by Claude himself initially, as well as all css files, for easing development and focusing on Angular while also making the app look nice.

## ✨ Features

- **Modern Angular 20** with zoneless architecture
- **Dark Theme** with consistent design system
- **Angular Material UI** components with custom styling
- **Responsive Design** with mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Angular CLI

### Installation Commands

Run these commands in your terminal:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
# or
ng serve

# 3. Open browser
# Navigate to http://localhost:4200
```

### Build for Production

```bash
# Build for production
npm run build
# or
ng build --configuration production
```

## 🎨 Styling System

### Color Palette

The app uses a carefully crafted dark theme:

```scss
// Primary Colors
$primary-dark: #1a1a1a;
$secondary-dark: #2d2d2d;
$surface-dark: #363636;
$background-dark: #121212;

// Accent Colors
$accent-primary: #4fc3f7;    // Light blue
$accent-secondary: #81c784;  // Light green
$accent-warning: #ffb74d;    // Orange
$accent-error: #e57373;      // Light red
```

### Using Custom Components

#### Button Component

```html
<!-- Primary button -->
<app-button variant="primary" size="md">Save Recipe</app-button>

<!-- Secondary button with loading -->
<app-button variant="secondary" [loading]="isLoading">Cancel</app-button>

<!-- Ghost button -->
<app-button variant="ghost" size="sm">Edit</app-button>
```

#### Input Component

```html
<!-- Basic input -->
<app-input 
  label="Recipe Title" 
  placeholder="Enter recipe name"
  [required]="true">
</app-input>

<!-- Input with error -->
<app-input 
  label="Email" 
  type="email"
  [error]="emailError"
  helper="We'll never share your email">
</app-input>
```

#### Card Component

```html
<!-- Recipe card -->
<app-card [interactive]="true" [hasImageSlot]="true" [hasFooterSlot]="true">
  <img slot="image" [src]="recipe.image" [alt]="recipe.title">
  
  <h3>{{ recipe.title }}</h3>
  <p>{{ recipe.description }}</p>
  
  <div slot="footer">
    <app-badge variant="primary">{{ recipe.category }}</app-badge>
    <span>{{ recipe.cookTime }} mins</span>
  </div>
</app-card>
```

### CSS Utility Classes

The app includes a comprehensive set of utility classes:

```html
<!-- Spacing -->
<div class="p-lg m-md">Content with padding and margin</div>

<!-- Flexbox -->
<div class="d-flex justify-between align-center">
  <span>Left content</span>
  <span>Right content</span>
</div>

<!-- Typography -->
<h1 class="text-2xl font-bold text-primary">Heading</h1>
<p class="text-sm text-secondary">Description</p>
```

### Animation Classes

Add smooth animations to your components:

```html
<!-- Fade animations -->
<div class="animate-fade-in">Fades in on load</div>
<div class="animate-fade-in-up">Slides up while fading in</div>

<!-- Hover effects -->
<div class="hover-lift">Lifts on hover</div>
<div class="hover-scale">Scales on hover</div>
```

## 📁 Project Structure

```
src/
├── app/
│   ├── features/           # Feature modules (recipes, auth, etc.)
│   ├── shared/
│   │   ├── components/     # Reusable UI components
│   │   └── services/       # Shared services
│   ├── app.component.*     # Root component
│   └── app.config.ts       # App configuration
├── styles/                 # Global styles
│   ├── _variables.scss     # Design tokens
│   ├── _mixins.scss        # Reusable mixins
│   ├── _utilities.scss     # Utility classes
│   ├── _components.scss    # Component styles
│   └── _animations.scss    # Animation utilities
└── styles.scss            # Main stylesheet
```

## 🌙 Dark Theme

The app features a carefully designed dark theme that:

- Reduces eye strain in low-light conditions
- Provides excellent contrast ratios for accessibility
- Uses modern design principles
- Maintains brand consistency

All components automatically inherit the dark theme styling.

## 📚 Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.dev)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Happy Coding! 🚀**

Focus on building amazing functionality while the styling system takes care of making your app look professional and modern.
