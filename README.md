# WeatherHub - Modern Weather Application

A modern, feature-rich weather application built with React, Tailwind CSS, and OpenWeatherMap API.

## ✨ Features

### Core Features

- 🔍 **Search by City** - Find weather for any city worldwide
- 📍 **Location Detection** - Auto-detect your location using geolocation
- 🌡️ **Temperature Display** - Real-time temperature with feels-like, min/max
- 🌤️ **Weather Conditions** - Visual icons for different weather types
- 💨 **Wind Speed** - Current wind conditions
- 💧 **Humidity** - Current humidity percentage
- 👁️ **Visibility** - Air visibility distance
- ☁️ **Cloud Coverage** - Cloud percentage in the sky
- 🌅 **Sunrise/Sunset** - Time of sunrise and sunset
- ⏱️ **Pressure** - Atmospheric pressure reading

### Advanced Features

- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 🎨 **Dynamic Background** - Background changes based on weather condition
- 🌡️ **Temperature Conversion** - Switch between Celsius and Fahrenheit
- 📜 **Search History** - Quick access to recently searched cities
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Loading States** - Smooth loading animations
- ❌ **Error Handling** - Helpful error messages
- 🎭 **Modern UI** - Glass-morphism effects with Tailwind CSS

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager

### Step 1: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
```

### Step 2: Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### Step 3: Add API Key

1. Open `src/App.jsx`
2. Find this line (around line 30):
   ```javascript
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
   ```
3. Replace `YOUR_OPENWEATHERMAP_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = "your-actual-api-key-here";
   ```

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:3000`

## 🏗️ Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
Weather-App/
├── src/
│   ├── App.jsx              # Main React component with all logic
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      // Add more colors
    },
  },
}
```

### Modify API Endpoint

The default API uses metric units (Celsius, m/s). To change:

- Edit the `units` parameter in `fetchWeather()` function
- Options: `metric` (Celsius), `imperial` (Fahrenheit)

### Customize Search Placeholder

Edit the placeholder text in the search input field in App.jsx

## 🔑 API Information

### OpenWeatherMap Free Tier

- Free API: 1,000 calls/day
- No credit card required
- Data updates every 10 minutes
- Includes: Temperature, humidity, wind, clouds, pressure

**Note:** The free tier is perfect for development and small-scale usage.

## ⚙️ Environment Variables (Optional)

For production, you can use environment variables:

1. Create a `.env.local` file:

```
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
```

2. Update App.jsx to use:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

## 🚨 Troubleshooting

### "City not found" Error

- Double-check the city name spelling
- Try searching for major cities first
- Ensure your API key is correct

### API Key not working

- Verify the API key is from OpenWeatherMap (not another service)
- Wait a few minutes after creating the API key (it takes time to activate)
- Check if the key has the right permissions

### No data displaying

- Open browser DevTools (F12)
- Check Console tab for errors
- Verify your internet connection
- Ensure API calls are going through (Network tab)

### Geolocation not working

- Your browser must request permission
- Some browsers require HTTPS for geolocation
- Check browser privacy settings

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM renderer
- **axios** - HTTP client for API calls
- **lucide-react** - Beautiful icon library
- **tailwindcss** - Utility-first CSS framework
- **vite** - Next-generation build tool

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

## 💡 Tips for Enhancement

1. **Add Weather Alerts** - Show severe weather warnings
2. **7-Day Forecast** - Display extended forecast
3. **Weather Maps** - Integrate weather radar
4. **Notifications** - Push notifications for weather changes
5. **Favorites** - Save favorite cities
6. **Multiple Locations** - Compare weather across cities
7. **Weather Details** - Add pollen count, UV index, etc.

## 📄 License

This project is open-source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Share your enhancements!

## 📧 Support

For issues or questions:

1. Check the troubleshooting section
2. Review OpenWeatherMap API documentation
3. Check browser console for errors

---

**Happy Weather Tracking!** ☀️🌧️❄️
