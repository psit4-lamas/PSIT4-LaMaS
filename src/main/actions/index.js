import firebase from '../../firebase';
import config, {isDevelopment} from '../../firebase/configLoader';

const Actions = {
    LOAD_USER: 'LOAD_USER',
    USER_REDIRECT_SUCCESS: 'USER_REDIRECT_SUCCESS',

    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
    // TODO: add actual fetching user's bookmarked subjects from backend
    SUBJECTS_SELECTED: 'SUBJECTS_SELECTED',
    LOAD_SUBJECT: 'LOAD_SUBJECT',
    LOAD_SUBJECT_SUCCESS: 'LOAD_SUBJECT_SUCCESS',
    LOAD_SUBJECT_HEAD: 'LOAD_SUBJECT_HEAD',
    LOAD_SUBJECT_HEAD_SUCCESS: 'LOAD_SUBJECT_HEAD_SUCCESS',
    SUBJECT_INSERT_HEAD: 'SUBJECT_INSERT_HEAD',
    SUBJECT_REMOVE_HEAD: 'SUBJECT_REMOVE_HEAD',
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
        firebase
            .auth()
            .signOut()
            .then((res) => {
                dispatch({type: Actions.LOG_OUT_SUCCESS});
            })
            .catch((err) => {
                console.log('ERROR ON LOGOUT ', err);
            });
    };
};

const loadSubject = (subjectId) => {
    return (dispatch) => {
        firebase
            .database()
            .collection('subjects')
            .doc(subjectId)
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    dispatch({
                        type: Actions.LOAD_SUBJECT_SUCCESS,
                        payload: doc.data(),
                    });
                }
            });
    };
};

const loadSubjectHead = () => {
    return (dispatch) => {
        firebase
            .database()
            .collection('subjects')
            .onSnapshot(function (querySnapshot) {
                querySnapshot.docChanges().forEach(function (change) {
                    if (change.type === 'added') {
                        dispatch({
                            type: Actions.SUBJECT_INSERT_HEAD,
                            payload: {
                                name: change.doc.data().subject_name,
                                subjectId: change.doc.id,
                            },
                        });
                    }
                    if (change.type === 'removed') {
                        dispatch({
                            type: Actions.SUBJECT_REMOVE_HEAD,
                            payload: {
                                name: change.doc.data().subject_name,
                                subjectId: change.doc.id,
                            },
                        });
                    }
                });
            });
    };
};

export {Actions, loadUser, userRedirectedToAccessedPath, subscribeToAuthStateChanged, logIn, logOut, loadSubject, loadSubjectHead};
