// Configuration for Gemini API
// Your Gemini API key is configured below

const CONFIG = {
    // Get your API key from: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: 'AIzaSyCdgZZgfeEFDOZz0JK-HzIX-OWDVs5RrSI',

    // Set to true to use Gemini API, false to use local AI simulation
    USE_GEMINI_API: true,

    // Model to use
    GEMINI_MODEL: 'gemini-pro',
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
