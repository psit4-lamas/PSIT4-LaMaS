import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "firebase/firestore";
import config from "./configLoader";


const provider = new firebase.auth.EmailAuthProvider();


class Firebase {
    static instance;

    constructor() {
        if (Firebase.instance) {
            return Firebase.instance;
        }

        console.log(config.default);
        this.fire = firebase.initializeApp(config.default);
        this.provider = provider;

        Firebase.instance = this;
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
