import { combineReducers } from 'redux';
import { Actions } from '../actions';


const initialState = {
    user: {
        isAuthenticated: false,
        isLoadingUser: true,
        userAccessedPathname: '',
    },
    tabs: {
        activeTabs: [ 'KI2', 'IS', 'PSIT4' ],
    },
};


const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.LOAD_USER:
            // Started fetching user from firebase:
            // save the requested pathname and render LoadingPage
            return {
                ...state,
                isLoadingUser: true,
                userAccessedPathname: action.payload,
            };
        case Actions.USER_REDIRECT_SUCCESS:
            // Finished login process or page reload:
            // clear the saved requested pathname and render that page content
            return {
                ...state,
                userAccessedPathname: '',
            };
        case Actions.LOG_IN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: !!action.payload,
                isLoadingUser: false,
            };
        case Actions.LOG_OUT_SUCCESS:
            const user = Object.assign({}, state);
            if (user.isLoadingUser) {
                console.log('USER NOT YET LOGGED IN; FINISHED LOADING');

                return {
                    ...user,
                    isAuthenticated: false,
                    isLoadingUser: false,
                };
            } else {
                console.log('USER WANTS TO LOGOUT');

                return {
                    isAuthenticated: false,
                    isLoadingUser: false,
                };
            }
        default:
            return { ...state };
    }
};

const tabsReducer = (state = initialState.tabs, action) => {
    // TODO: add more reducer case according to the success fetch user's bookmarked subjects action
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default combineReducers({
    user: userReducer,
    tabs: tabsReducer,
});
