import { combineReducers } from 'redux';
import { Actions } from '../actions';


const initialState = {
    user: {
        isAuthenticated: false,
    },
    tabs: {
        activeTabs: [ 'KI2', 'IS', 'Prog C' ],
    },
};


const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.LOG_IN_SUCCESS:
            return {
                ...action.payload,
                isAuthenticated: !!action.payload,
            };
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
