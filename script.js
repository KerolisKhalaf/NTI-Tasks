// API Configuration
const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const API_KEY = ''; // You can add your API key if you have one

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipesGrid = document.getElementById('recipesGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const sectionTitle = document.getElementById('sectionTitle');
const navLinks = document.querySelectorAll('.nav-link');

// State Management
let currentCategory = 'home';
let currentRecipes = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    loadDefaultRecipes();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleNavigation(this);
        });
    });
}

// Handle Navigation
function handleNavigation(clickedLink) {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
    
    // Get category
    const category = clickedLink.dataset.category;
    currentCategory = category;
    
    // Update section title
    updateSectionTitle(category);
    
    // Load recipes for the category
    if (category === 'home') {
        loadDefaultRecipes();
    } else {
        searchRecipes(category);
    }
}

// Update Section Title
function updateSectionTitle(category) {
    const titles = {
        home: 'Popular Recipes',
        pizza: 'Delicious Pizza Recipes',
        pasta: 'Amazing Pasta Dishes',
        popcorn: 'Tasty Popcorn Treats'
    };
    
    sectionTitle.textContent = titles[category] || 'Recipes';
}

// Handle Search
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        searchRecipes(query);
        updateSectionTitle('custom');
        sectionTitle.textContent = `Search Results for "${query}"`;
    }
}

// Load Default Recipes (Popular ones)
async function loadDefaultRecipes() {
    const defaultQueries = ['chicken', 'pasta', 'salad', 'soup'];
    const randomQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];
    await searchRecipes(randomQuery);
}

// Search Recipes from API
async function searchRecipes(query) {
    try {
        showLoading(true);
        hideNoResults();
        clearRecipes();
        
        const response = await fetch(`${API_URL}?search=${encodeURIComponent(query)}&key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.data.recipes.length > 0) {
            currentRecipes = data.data.recipes;
            displayRecipes(currentRecipes);
        } else {
            showNoResults();
        }
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
        showError('Failed to load recipes. Please try again later.');
    } finally {
        showLoading(false);
    }
}

// Display Recipes
function displayRecipes(recipes) {
    clearRecipes();
    
    recipes.forEach((recipe, index) => {
        const recipeCard = createRecipeCard(recipe, index);
        recipesGrid.appendChild(recipeCard);
    });
}

// Create Recipe Card
function createRecipeCard(recipe, index) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe-image" 
             onerror="this.src='https://via.placeholder.com/400x200/667eea/ffffff?text=Recipe+Image'">
        <div class="recipe-content">
            <h3 class="recipe-title">${truncateText(recipe.title, 50)}</h3>
            <p class="recipe-publisher">
                <i class="fas fa-user"></i>
                ${recipe.publisher}
            </p>
            <div class="recipe-buttons">
                <button class="btn btn-primary" onclick="openRecipeDetails('${recipe.id}')">
                    <i class="fas fa-info-circle"></i>
                    Details
                </button>
                <a href="${recipe.source_url}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i>
                    Source
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Open Recipe Details (Modal or new page)
async function openRecipeDetails(recipeId) {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_URL}/${recipeId}?key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showRecipeModal(data.data.recipe);
        }
        
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Failed to load recipe details. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Show Recipe Modal
function showRecipeModal(recipe) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('recipeModal');
    if (!modal) {
        modal = createRecipeModal();
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${recipe.title}</h2>
            <span class="close" onclick="closeRecipeModal()">&times;</span>
        </div>
        <div class="modal-body">
            <img src="${recipe.image_url}" alt="${recipe.title}" class="modal-image">
            <div class="recipe-info">
                <p><strong>Publisher:</strong> ${recipe.publisher}</p>
                <p><strong>Cooking Time:</strong> ${recipe.cooking_time || 'N/A'} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings || 'N/A'}</p>
                
                <h3>Ingredients:</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients ? recipe.ingredients.map(ing => 
                        `<li>${ing.quantity || ''} ${ing.unit || ''} ${ing.description}</li>`
                    ).join('') : '<li>Ingredients not available</li>'}
                </ul>
                
                <div class="modal-buttons">
                    <a href="${recipe.source_url}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        View Full Recipe
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Create Recipe Modal
function createRecipeModal() {
    const modal = document.createElement('div');
    modal.id = 'recipeModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <!-- Content will be dynamically inserted -->
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: white;
                margin: 2% auto;
                border-radius: 20px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                animation: modalSlideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border-radius: 20px 20px 0 0;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .close {
                font-size: 2rem;
                cursor: pointer;
                color: white;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .close:hover {
                opacity: 1;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-image {
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                border-radius: 15px;
                margin-bottom: 1.5rem;
            }
            
            .recipe-info h3 {
                color: #333;
                margin: 1.5rem 0 1rem 0;
                font-size: 1.3rem;
            }
            
            .ingredients-list {
                list-style: none;
                padding: 0;
            }
            
            .ingredients-list li {
                padding: 0.5rem 0;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                align-items: center;
            }
            
            .ingredients-list li:before {
                content: "🥄";
                margin-right: 10px;
            }
            
            .modal-buttons {
                margin-top: 2rem;
                text-align: center;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 5% auto;
                }
                
                .modal-body {
                    padding: 1rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    return modal;
}

// Close Recipe Modal
function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utility Functions
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

function showNoResults() {
    noResults.classList.add('show');
}

function hideNoResults() {
    noResults.classList.remove('show');
}

function clearRecipes() {
    recipesGrid.innerHTML = '';
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function showError(message) {
    // Create a simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('recipeModal');
    if (modal && event.target === modal) {
        closeRecipeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeRecipeModal();
    }
});