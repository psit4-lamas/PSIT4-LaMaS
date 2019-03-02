import devConfig from './firebase-config.dev';
import prodConfig from './firebase-config.prod';

import firebase from 'firebase';

class Firebase {

    constructor() {
        const config = Firebase.isDevelopment() ? devConfig : prodConfig;
        this.fire = firebase.initializeApp(config);
    }

    static isDevelopment() {
        return process.env.NODE_ENV !== 'production';
    }

    auth() {
        return this.fire.auth();
    }

    database() {
        return this.fire.firestore();
    }

    storage() {
        return this.fire.storage();
    }

    functions() {
        return this.fire.functions();
    }
}

const fb = new Firebase();
export default fb;
