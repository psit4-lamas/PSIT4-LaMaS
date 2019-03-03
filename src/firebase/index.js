import firebase from 'firebase';
import config from './configLoader';


class Firebase {

    constructor() {
        this.fire = firebase.initializeApp(config);
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
