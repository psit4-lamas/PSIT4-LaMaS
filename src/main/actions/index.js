import firebase from '../../firebase';
import config, { isDevelopment } from '../../firebase/configLoader';


const Actions = {
    LOAD_USER: 'LOAD_USER',
    USER_REDIRECT_SUCCESS: 'USER_REDIRECT_SUCCESS',

    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
    // TODO: add actual fetching user's bookmarked subjects from backend
    SUBJECTS_SELECTED: 'SUBJECTS_SELECTED',
};

// When fetching the current user, keep track of which pathname she/he tried to access,
// in order to redirect her/him to that page after authentication
const loadUser = (userAccessedPathname) => {
    return (dispatch) => {
        dispatch({
            type: Actions.LOAD_USER,
            payload: userAccessedPathname,
        });
    };
};

const userRedirectedToAccessedPath = () => {
    return (dispatch) => {
        dispatch({
            type: Actions.USER_REDIRECT_SUCCESS,
        });
    };
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

                dispatch({
                    type: Actions.LOG_OUT_SUCCESS,
                });
            }
        });
    };
};

const logIn = (email, password) => {
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
        firebase.auth().signOut()
            .then((res) => {
                dispatch({ type: Actions.LOG_OUT_SUCCESS });
            })
            .catch((err) => {
                console.log('ERROR ON LOGOUT ', err);
            });
    };

};

export { Actions, loadUser, userRedirectedToAccessedPath, subscribeToAuthStateChanged, logIn, logOut };
