let config;

const isDevelopment = () => process.env.NODE_ENV !== 'production';

if (isDevelopment()) {
    try {
        config = require('./firebase-config.dev');
    } catch (e) {
        console.log("No dev config. Create a firebase-config.dev.js file with your own firebase project.");
    }
} else {
    config = require('./firebase-config.prod');
}

export default config;

