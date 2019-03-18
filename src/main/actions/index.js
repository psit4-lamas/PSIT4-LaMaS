import firebase from '../../firebase';
import config, { isDevelopment } from '../../firebase/configLoader';


const Actions = {
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_OUT: 'LOG_OUT',
    // TODO: add actual fetching user's bookmarked subjects from backend
    SUBJECTS_SELECTED: 'SUBJECTS_SELECTED',
};


const subscribeToAuthStateChanged = () => {

    return (dispatch) => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);

                // If the user has not confirmed his/her account yet, re-send a confirmation email
                // with a 'Continue' link, redirecting the user to the LaMaS web application
                if (!user.emailVerified) {
                    const redirectURI = isDevelopment() ? 'http://localhost:3000' : `https://${ config.default.authDomain }`;

                    user.sendEmailVerification({
                        url: redirectURI,
                    });
                }

                dispatch({
                    type: Actions.LOG_IN_SUCCESS,
                    payload: user,
                });
            } else {
                console.log('User logged out!');
            }
        });
    };
};

const logIn = (email, password) => {
    console.table({ email, password });

    return (dispatch) => {

        // Connect to Firebase to perform a user login
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                console.log(userCredentials);

                dispatch({
                    type: Actions.LOG_IN_SUCCESS,
                    payload: userCredentials.user,
                });
            })
            .catch((err) => console.log(err));
    };



};


const logOut = () => {

    return (dispatch) => {


            // TODO: auth logout in redux
        firebase.auth().signOut()
            .then((res) => {

                dispatch ({type: Actions.LOG_OUT});
            })
            .catch((err) => {
                console.log('ERROR ON LOGOUT ', err);
            });


    };

};

export { Actions, subscribeToAuthStateChanged, logIn, logOut };
