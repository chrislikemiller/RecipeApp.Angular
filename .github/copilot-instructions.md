<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Recipe App Angular Project

This is an Angular recipe sharing application with the following characteristics:

## Tech Stack
- Angular 20 (latest) with zoneless architecture
- Angular Material UI for base components
- SCSS for styling with dark theme
- TypeScript for type safety
- Standalone components architecture

## Styling Guidelines
- **Dark Theme**: Primary colors are dark gray (#2d2d2d) with accent colors
- **Consistent Design**: Use the established color variables and mixins
- **Angular Material**: Leverage Material components but customize with dark theme
- **Responsive**: All components should be mobile-friendly
- **Animations**: Use the predefined animations for consistency

## Code Style
- Use standalone components (no NgModules)
- Follow Angular best practices for signals and reactive forms
- Use TypeScript strict mode
- Implement proper error handling and loading states
- Follow the existing SCSS architecture with variables, mixins, and utilities

## Project Structure
- `/src/app/shared/` - Reusable components and services
- `/src/app/features/` - Feature-specific components (recipes, auth, etc.)
- `/src/styles/` - Global styles, themes, and utilities
- Use barrel exports for clean imports

## Recipe App Features
- Recipe CRUD operations
- User authentication (login/register)
- Recipe sharing and discovery
- Dark, modern UI with smooth animations
