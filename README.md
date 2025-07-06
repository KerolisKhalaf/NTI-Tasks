# Delicious Recipes - Food Website

A modern, responsive food website that fetches data from the Forkify API and displays recipes in beautiful cards with navigation functionality.

## Features

### 🍕 **Navigation Categories**
- **Home**: Popular recipes from various categories
- **Pizza**: Delicious pizza recipes
- **Pasta**: Amazing pasta dishes  
- **Popcorn**: Tasty popcorn treats

### 🔍 **Search Functionality**
- Real-time search through thousands of recipes
- Search by ingredient, dish name, or cuisine type
- Responsive search interface

### 📱 **Recipe Cards**
Each recipe card includes:
- High-quality recipe image
- Recipe title and publisher
- **Details Button**: Opens a modal with full recipe information including ingredients
- **Source Button**: Links to the original recipe source

### 🎨 **Modern Design**
- Beautiful gradient backgrounds
- Glass morphism effects
- Smooth animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Modern card-based layout

### 📱 **Recipe Details Modal**
- Complete ingredient list
- Cooking time and servings
- Publisher information
- Direct link to full recipe

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: API integration and interactive functionality
- **Forkify API**: Recipe data source
- **Font Awesome**: Beautiful icons

## API Integration

The website uses the [Forkify API v2](https://forkify-api.herokuapp.com/v2) to fetch recipe data:

- **Search Endpoint**: `https://forkify-api.herokuapp.com/api/v2/recipes?search=QUERY`
- **Recipe Details**: `https://forkify-api.herokuapp.com/api/v2/recipes/RECIPE_ID`

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Start exploring** recipes by:
   - Using the navigation menu (Home, Pizza, Pasta, Popcorn)
   - Searching for specific recipes in the search bar
   - Clicking "Details" to see full recipe information
   - Clicking "Source" to visit the original recipe website

## File Structure

```
├── index.html          # Main HTML file
├── style.css          # CSS styling and animations
├── script.js          # JavaScript functionality
└── README.md          # Project documentation
```

## Features in Detail

### Navigation System
- Smooth active state transitions
- Category-based recipe filtering
- Mobile-responsive navigation

### Search System
- Enter key support
- Real-time API integration
- Loading states and error handling

### Recipe Display
- Grid layout with responsive columns
- Image fallbacks for broken links
- Animated card appearances
- Hover effects and micro-interactions

### Modal System
- Detailed recipe information
- Ingredient list display
- Multiple ways to close (X button, outside click, Escape key)
- Mobile-optimized layout

## Responsive Design

The website is fully responsive and works on:
- **Desktop**: Full grid layout with multiple columns
- **Tablet**: Adjusted grid and spacing
- **Mobile**: Single column layout with optimized navigation

## Error Handling

- Network error notifications
- API failure handling
- Image loading fallbacks
- No results messaging

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Requires JavaScript enabled

## API Rate Limits

The Forkify API has rate limits. For production use, consider:
- Adding your own API key
- Implementing caching
- Adding retry logic

## Contributing

Feel free to enhance the website by:
- Adding more recipe categories
- Implementing favorites functionality
- Adding recipe rating system
- Improving the search filters

## License

This project is open source and available under the MIT License.
