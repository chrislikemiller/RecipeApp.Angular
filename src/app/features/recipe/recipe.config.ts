export interface RecipePageConfig {
  title: string;
  route: string;
  icon?: string;
  description?: string;
  canModifyRecipes: boolean;
}

export const RECIPE_PAGE_CONFIGS: Record<string, RecipePageConfig> = {
  all: {
    title: 'All Recipes',
    route: 'all',
    icon: 'restaurant_menu',
    description: 'Discover amazing recipes from our community',
    canModifyRecipes: false,
  },
  my: {
    title: 'My Recipes',
    route: 'my',
    icon: 'book',
    description: 'Your personal recipe collection',
    canModifyRecipes: true,
  },
  favorites: {
    title: 'Favorite Recipes',
    route: 'favorites',
    icon: 'favorite',
    description: 'Recipes you love the most',
    canModifyRecipes: false,
  }
};