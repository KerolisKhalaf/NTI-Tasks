const mealsContainer = document.getElementById('meals-container');

async function loadMeals(query = 'pizza') {
  mealsContainer.innerHTML = '<p>Loading...</p>';
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    const data = await res.json();
    if (!data.recipes.length) {
      mealsContainer.innerHTML = '<p>No recipes found.</p>';
      return;
    }
    displayMeals(data.recipes);
  } catch (err) {
    mealsContainer.innerHTML = '<p>Error loading meals. Please try again later.</p>';
  }
}

function displayMeals(meals) {
  mealsContainer.innerHTML = meals.map(meal => `
    <div class="card">
      <img src="${meal.image_url}" alt="${meal.title}" />
      <h3>${meal.title}</h3>
      <button onclick="viewDetails('${meal.recipe_id}')">Details</button>
      <a href="${meal.source_url}" target="_blank"><button>Source</button></a>
    </div>
  `).join('');
}

function viewDetails(id) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = 'Recipe Details';
  body.innerHTML = `Loading details for recipe ID: <strong>${id}</strong>...`;

  modal.style.display = 'block';
}
  function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

loadMeals();



function toggleDarkMode() {
  document.body.classList.toggle('dark');

  const icon = document.getElementById('toggle-dark');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
