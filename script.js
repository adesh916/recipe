let selectedIngredients = [];
const ingredientInput = document.getElementById('ingredient');
const addIngredientButton = document.getElementById('add-ingredient');
const ingredientsList = document.getElementById('ingredients-list');
const searchButton = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('recipes');
// Add Ingredient
addIngredientButton.addEventListener('click', addIngredient);

// Remove Ingredient
ingredientsList.addEventListener('click', removeIngredient);

// Search Recipes
searchButton.addEventListener('click', searchRecipes);
function addIngredient() {
    const ingredient = ingredientInput.value.trim();
    if (ingredient && !selectedIngredients.includes(ingredient.toLowerCase())) {
      selectedIngredients.push(ingredient.toLowerCase());
      updateIngredientsList();
      ingredientInput.value = '';
    }
  }
  function updateIngredientsList() {
    ingredientsList.innerHTML = '';
    selectedIngredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      const removeBtn = document.createElement('span');
      removeBtn.textContent = '✕';
      removeBtn.classList.add('remove-ingredient');
      li.appendChild(removeBtn);
      ingredientsList.appendChild(li);
    });
  }
  function removeIngredient(e) {
    if (e.target.classList.contains('remove-ingredient')) {
      const ingredient = e.target.parentElement.firstChild.textContent;
      selectedIngredients = selectedIngredients.filter((item) => item !== ingredient);
      updateIngredientsList();
    }
  }
  function searchRecipes() {
    if (selectedIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }
  
    // TheMealDB API or local JSON
    fetchRecipes(selectedIngredients);
  }
  function fetchRecipes(ingredients) {
    const ingredientQuery = ingredients.join(',');
    const apiUrl = `https://www.themealdb.com/api/json/v2/1/filter.php?i=${ingredientQuery}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Sorry, no recipes found.</p>';
      });
  }
  function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    if (!recipes) {
      recipesContainer.innerHTML = '<p>No recipes found with the selected ingredients.</p>';
      return;
    }
  
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
  
      recipeCard.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>${recipe.strMeal}</h3>
        <a href="https://www.themealdb.com/meal.php?c=${recipe.idMeal}" target="_blank">View Recipe</a>
      `;
  
      recipesContainer.appendChild(recipeCard);
    });
  }