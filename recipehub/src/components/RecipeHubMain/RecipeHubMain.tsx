import { component$, useSignal, $ } from "@builder.io/qwik";
import styles from "./RecipeHubMain.module.css";

/**
 * PUBLIC_INTERFACE
 * Main container for RecipeHub: includes search bar, categories, recipe grid, and bottom navigation.
 */
export const RecipeHubMain = component$(() => {
  // State for search input
  const search = useSignal("");
  // Placeholder categories - to be fetched dynamically or extended later
  const categories = [
    { name: "All", icon: "🍲" },
    { name: "Breakfast", icon: "🥞" },
    { name: "Lunch", icon: "🥗" },
    { name: "Dinner", icon: "🍝" },
    { name: "Dessert", icon: "🧁" },
    { name: "Vegan", icon: "🥑" },
    { name: "Drinks", icon: "🍹" },
  ];
  // Placeholder recipes - DEMO DATA; replace with API later
  const recipes = [
    {
      id: 1,
      title: "Pasta Primavera",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      category: "Dinner",
    },
    {
      id: 2,
      title: "Vegan Avocado Toast",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
      category: "Breakfast",
    },
    {
      id: 3,
      title: "Strawberry Pancakes",
      image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0",
      category: "Breakfast",
    },
    {
      id: 4,
      title: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1542444459-db68ac1c90b9",
      category: "Dessert",
    },
    {
      id: 5,
      title: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1447078806655-40579c2520d6",
      category: "Lunch",
    },
    {
      id: 6,
      title: "Matcha Latte",
      image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d",
      category: "Drinks",
    },
    {
      id: 7,
      title: "Tomato Soup",
      image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
      category: "Dinner",
    },
    {
      id: 8,
      title: "Fruit Bowl",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      category: "Vegan",
    },
  ];
  // Selected category state (All = default)
  const selectedCategory = useSignal("All");

  // Filtered recipes by search and category
  const filteredRecipes = recipes.filter(
    (r) =>
      (selectedCategory.value === "All" || r.category === selectedCategory.value) &&
      r.title.toLowerCase().includes(search.value.trim().toLowerCase())
  );

  // Handlers
  const handleCategoryClick = $((cat: string) => {
    selectedCategory.value = cat;
  });

  // Navigate to recipe detail (placeholder: use Qwik routing in full version)
  const handleRecipeClick = $((recipeId: number) => {
    window.alert(`Open Recipe Detail for ID: ${recipeId} (Navigation placeholder)`);
  });

  // Bottom nav handler (only visual for now)
  const navTabs = [
    { label: "Home", icon: "🏠" },
    { label: "Favorites", icon: "❤️" },
    { label: "Collections", icon: "📁" },
  ];
  const activeTab = useSignal("Home");

  return (
    <div class={styles.mainContainer}>
      {/* Search Bar */}
      <div class={styles.searchBarContainer}>
        <input
          type="text"
          value={search.value}
          placeholder="Search recipes..."
          class={styles.searchBar}
          onInput$={(e) => (search.value = (e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Category Scroll */}
      <div class={styles.categoryScroll}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            class={[
              styles.categoryItem,
              selectedCategory.value === cat.name ? styles.categoryActive : "",
            ]}
            onClick$={() => handleCategoryClick(cat.name)}
          >
            <span class={styles.categoryIcon}>{cat.icon}</span>
            <span class={styles.categoryLabel}>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Grid of Recipes */}
      <div class={styles.recipeGrid}>
        {filteredRecipes.length === 0 && (
          <div class={styles.noResults}>No recipes found.</div>
        )}
        {filteredRecipes.map((r) => (
          <div
            class={styles.recipeCard}
            key={r.id}
            onClick$={() => handleRecipeClick(r.id)}
            tabIndex={0}
            role="button"
            aria-label={"View details for " + r.title}
          >
            <img
              class={styles.recipeImage}
              src={r.image}
              alt={r.title}
              width={300}
              height={210}
            />
            <div class={styles.recipeInfo}>
              <div class={styles.recipeTitle}>{r.title}</div>
              <div class={styles.recipeCategory}>{r.category}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav class={styles.bottomNav}>
        {navTabs.map((tab) => (
          <button
            key={tab.label}
            class={[
              styles.bottomNavItem,
              activeTab.value === tab.label ? styles.bottomNavActive : "",
            ]}
            onClick$={() => (activeTab.value = tab.label)}
            aria-label={tab.label}
          >
            <span class={styles.bottomNavIcon}>{tab.icon}</span>
            <span class={styles.bottomNavLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
});
