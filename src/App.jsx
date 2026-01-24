import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Search,
  Eye,
  Gauge,
  Moon,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  MapPin,
  AlertCircle,
  Loader,
} from "lucide-react";
import axios from "axios";

const App = () => {
  // State Management
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [weatherHistory, setWeatherHistory] = useState([]);

  // OpenWeatherMap API Key - REPLACE WITH YOUR OWN
  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  /**
   * Fetch weather data from OpenWeatherMap API
   */
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY_HERE") {
      setError(
        "⚠️ API Key not configured. Please add your OpenWeatherMap API key in the App.jsx file",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: "metric",
        },
      });

      setWeatherData(response.data);
      setCity(response.data.name);

      // Add to history if not already there
      if (!weatherHistory.includes(response.data.name)) {
        setWeatherHistory([response.data.name, ...weatherHistory].slice(0, 5));
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("❌ City not found. Please check the spelling and try again.");
      } else if (err.response?.status === 401) {
        setError("❌ Invalid API Key. Please check your configuration.");
      } else {
        setError("❌ Failed to fetch weather data. Please try again.");
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch user's geolocation weather
   */
  const fetchLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(true);
          setError("");

          try {
            const response = await axios.get(API_URL, {
              params: {
                lat: latitude,
                lon: longitude,
                appid: API_KEY,
                units: "metric",
              },
            });

            setWeatherData(response.data);
            setCity(response.data.name);
            setSearchInput("");
          } catch (err) {
            setError("Failed to fetch location weather");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Location access denied");
        },
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  /**
   * Handle search form submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(searchInput || city);
    setSearchInput("");
  };

  /**
   * Fetch initial weather on component mount
   */
  useEffect(() => {
    fetchWeather(city);
  }, []);

  /**
   * Get weather icon based on weather condition
   */
  const getWeatherIcon = (main, size = 48) => {
    const iconProps = { size, className: "text-blue-400" };

    switch (main?.toLowerCase()) {
      case "clear":
        return <Sun {...iconProps} className="text-yellow-400" />;
      case "clouds":
        return <Cloud {...iconProps} className="text-gray-400" />;
      case "rain":
        return <CloudRain {...iconProps} className="text-blue-600" />;
      case "drizzle":
        return <CloudDrizzle {...iconProps} className="text-blue-500" />;
      case "snow":
        return <CloudSnow {...iconProps} className="text-cyan-300" />;
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squall":
      case "tornado":
        return <CloudFog {...iconProps} className="text-gray-500" />;
      case "thunderstorm":
        return <Cloud {...iconProps} className="text-purple-600" />;
      default:
        return <Cloud {...iconProps} />;
    }
  };

  /**
   * Convert temperature between Celsius and Fahrenheit
   */
  const convertTemp = (celsius) => {
    return isCelsius ? celsius : (celsius * 9) / 5 + 32;
  };

  /**
   * Get background gradient based on weather condition
   */
  const getBackgroundGradient = () => {
    if (!weatherData) {
      return darkMode
        ? "from-gray-900 to-gray-800"
        : "from-blue-400 to-blue-600";
    }

    const weather = weatherData.weather[0].main?.toLowerCase();

    if (darkMode) {
      switch (weather) {
        case "clear":
          return "from-gray-900 via-blue-900 to-gray-800";
        case "clouds":
          return "from-gray-800 to-gray-700";
        case "rain":
          return "from-gray-900 via-slate-800 to-gray-800";
        case "snow":
          return "from-gray-900 to-blue-900";
        default:
          return "from-gray-900 to-gray-800";
      }
    } else {
      switch (weather) {
        case "clear":
          return "from-blue-400 via-cyan-300 to-blue-500";
        case "clouds":
          return "from-gray-400 to-gray-500";
        case "rain":
          return "from-blue-600 to-gray-600";
        case "snow":
          return "from-cyan-300 to-blue-400";
        case "thunderstorm":
          return "from-purple-900 to-indigo-900";
        default:
          return "from-blue-400 to-blue-600";
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 bg-gradient-to-br ${getBackgroundGradient()} ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`${
          darkMode ? "bg-gray-900/80" : "bg-white/20"
        } backdrop-blur-md sticky top-0 z-50 border-b ${
          darkMode ? "border-gray-700" : "border-white/20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sun className="text-yellow-400" size={32} />
            <h1 className="text-2xl font-bold">WeatherHub</h1>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all ${
              darkMode
                ? "bg-yellow-400/20 hover:bg-yellow-400/30"
                : "bg-white/30 hover:bg-white/40"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 animate-fade-in">
          <form
            onSubmit={handleSearch}
            className={`${
              darkMode ? "bg-gray-800/40" : "bg-white/20"
            } backdrop-blur-md rounded-2xl p-6 border ${
              darkMode ? "border-gray-700/50" : "border-white/30"
            }`}
          >
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for a city..."
                  className={`w-full pl-12 pr-4 py-2 rounded-lg border transition-all ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <Search size={20} />
                )}
                Search
              </button>

              <button
                type="button"
                onClick={fetchLocationWeather}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-purple-500 hover:bg-purple-600"
                } disabled:opacity-50 flex items-center gap-2`}
                aria-label="Get weather for current location"
              >
                <MapPin size={20} />
                Location
              </button>
            </div>

            {/* Search History */}
            {weatherHistory.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-400">Recent:</span>
                {weatherHistory.map((hist, idx) => (
                  <button
                    key={idx}
                    onClick={() => fetchWeather(hist)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  >
                    {hist}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-pulse ${
              darkMode
                ? "bg-red-900/30 border-red-700 text-red-200"
                : "bg-red-100 border-red-400 text-red-800"
            }`}
          >
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !weatherData && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="animate-spin text-blue-400" size={48} />
            <p className="mt-4 text-lg font-semibold">
              Loading weather data...
            </p>
          </div>
        )}

        {/* Weather Display */}
        {weatherData && !loading && (
          <div className="space-y-6 animate-fade-in">
            {/* Current Weather Card */}
            <div
              className={`${
                darkMode ? "bg-gray-800/40" : "bg-white/20"
              } backdrop-blur-md rounded-3xl p-8 border ${
                darkMode ? "border-gray-700/50" : "border-white/30"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {weatherData.name}
                  </h2>
                  <p className="text-lg opacity-80">
                    {weatherData.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      weatherData.weather[0].description.slice(1)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getWeatherIcon(weatherData.weather[0].main, 80)}
                </div>
              </div>

              {/* Temperature Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Current Temp */}
                <div
                  className={`${
                    darkMode ? "bg-gray-700/50" : "bg-white/30"
                  } rounded-2xl p-4 text-center`}
                >
                  <p className="text-sm opacity-80 mb-2">Temperature</p>
                  <p className="text-3xl font-bold">
                    {Math.round(convertTemp(weatherData.main.temp))}°
                    {isCelsius ? "C" : "F"}
                  </p>
                  <button
                    onClick={() => setIsCelsius(!isCelsius)}
                    className="text-xs mt-2 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 transition-all"
                  >
                    Switch to {isCelsius ? "°F" : "°C"}
                  </button>
                </div>

                {/* Feels Like */}
                <div
                  className={`${
                    darkMode ? "bg-gray-700/50" : "bg-white/30"
                  } rounded-2xl p-4 text-center`}
                >
                  <p className="text-sm opacity-80 mb-2">Feels Like</p>
                  <p className="text-3xl font-bold">
                    {Math.round(convertTemp(weatherData.main.feels_like))}°
                  </p>
                </div>

                {/* Min/Max */}
                <div
                  className={`${
                    darkMode ? "bg-gray-700/50" : "bg-white/30"
                  } rounded-2xl p-4 text-center`}
                >
                  <p className="text-sm opacity-80 mb-2">Min / Max</p>
                  <p className="text-2xl font-bold">
                    {Math.round(convertTemp(weatherData.main.temp_min))}° /{" "}
                    {Math.round(convertTemp(weatherData.main.temp_max))}°
                  </p>
                </div>

                {/* Pressure */}
                <div
                  className={`${
                    darkMode ? "bg-gray-700/50" : "bg-white/30"
                  } rounded-2xl p-4 text-center`}
                >
                  <p className="text-sm opacity-80 mb-2">Pressure</p>
                  <p className="text-2xl font-bold">
                    {weatherData.main.pressure} mb
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Humidity */}
                <div
                  className={`${
                    darkMode ? "bg-blue-900/30" : "bg-blue-300/30"
                  } rounded-2xl p-4 border ${
                    darkMode ? "border-blue-700/50" : "border-blue-400/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets size={20} />
                    <p className="text-sm opacity-80">Humidity</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {weatherData.main.humidity}%
                  </p>
                </div>

                {/* Wind Speed */}
                <div
                  className={`${
                    darkMode ? "bg-cyan-900/30" : "bg-cyan-300/30"
                  } rounded-2xl p-4 border ${
                    darkMode ? "border-cyan-700/50" : "border-cyan-400/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wind size={20} />
                    <p className="text-sm opacity-80">Wind Speed</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {weatherData.wind.speed} m/s
                  </p>
                </div>

                {/* Visibility */}
                <div
                  className={`${
                    darkMode ? "bg-purple-900/30" : "bg-purple-300/30"
                  } rounded-2xl p-4 border ${
                    darkMode ? "border-purple-700/50" : "border-purple-400/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={20} />
                    <p className="text-sm opacity-80">Visibility</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </p>
                </div>

                {/* Cloud Coverage */}
                <div
                  className={`${
                    darkMode ? "bg-gray-700/30" : "bg-gray-300/30"
                  } rounded-2xl p-4 border ${
                    darkMode ? "border-gray-600/50" : "border-gray-400/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={20} />
                    <p className="text-sm opacity-80">Cloud Cover</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {weatherData.clouds.all}%
                  </p>
                </div>
              </div>

              {/* Sunrise/Sunset */}
              {weatherData.sys && (
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Sun size={24} className="text-yellow-400" />
                    <div>
                      <p className="text-sm opacity-80">Sunrise</p>
                      <p className="font-semibold">
                        {new Date(
                          weatherData.sys.sunrise * 1000,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Moon size={24} className="text-purple-400" />
                    <div>
                      <p className="text-sm opacity-80">Sunset</p>
                      <p className="font-semibold">
                        {new Date(
                          weatherData.sys.sunset * 1000,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-16">
            <Cloud size={64} className="mx-auto opacity-50 mb-4" />
            <p className="text-2xl font-semibold mb-2">Welcome to WeatherHub</p>
            <p className="text-lg opacity-80">
              Search for a city or use the location button to get started
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`mt-12 py-8 border-t ${
          darkMode
            ? "border-gray-700 bg-gray-900/50"
            : "border-white/20 bg-white/10"
        } text-center`}
      >
        <p className="text-sm opacity-75 mb-4">
          Weather data powered by{" "}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            OpenWeatherMap
          </a>
        </p>

        {/* Developer Info */}
        <div className="max-w-4xl mx-auto px-4 py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-lg">
                <img
                  src="/samad.jpeg"
                  alt="Abdus Samad Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">
                Created by Abdus Samad
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                This modern Weather Application was built with React, Tailwind
                CSS, and Vite to provide real-time weather information from
                around the world. It features advanced functionality including
                dark mode, temperature conversion, geolocation support, and a
                responsive design that works seamlessly across all devices. The
                app demonstrates modern web development practices with clean
                code, comprehensive error handling, and an intuitive user
                interface.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
