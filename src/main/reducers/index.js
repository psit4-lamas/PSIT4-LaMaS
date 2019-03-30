import { combineReducers } from 'redux';
import { Actions } from '../actions';


const initialState = {
    user: {
        isAuthenticated: false,
        isLoadingUser: true,
        userAccessedPathname: '',
    },
    tabs: {
        activeTabs: [],
        subjectIds: [],
    },
    subject: {
        isLoadingSubject: true,
        currentSubjectId: '',
        currentSubject: {
            lectures: {},
        },
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
                    userAccessedPathname: '',
                };
            }
        default:
            return { ...state };
    }
};

const tabsReducer = (state = initialState.tabs, action) => {
    // TODO: add more reducer case according to the success fetch user's bookmarked subjects action

    switch (action.type) {
        case Actions.SUBJECT_INSERT_HEAD:
            const subject_id = action.payload.subjectId;
            const subject_name = action.payload.name;
            const found = state.subjectIds.find(function (element) {
                return element === subject_id;
            });

            // TODO: I have the impression we are doing two things in this reducer:
            //       - handling the add/remove active tabs (a tab should appear only if the subj content is requested)
            //       - handling the bookmarked subjects (the list of all bookmarked subjects should be available)
            // TODO: split this logic into 2 different reducers (can be fixed after Sprint 2)
            if (found === undefined) {
                return {
                    ...state,
                    ...action.payload,
                    activeTabs: [ ...state.activeTabs, subject_name ],
                    subjectIds: [ ...state.subjectIds, subject_id ],
                };
            } else {
                return { ...state };
            }

        case Actions.SUBJECT_REMOVE_HEAD:
            return {
                ...state,
                ...action.payload,
                activeTabs: state.activeTabs.filter(function (value) {
                    return !(subject_name === value);
                }),
                subjectIds: state.subjectIds.filter(function (value) {
                    return !(subject_id === value);
                }),
            };
        default:
            return { ...state };
    }
};

const subjectReducer = (state = initialState.subject, action) => {
    switch (action.type) {
        case Actions.LOAD_SUBJECT:
            return {
                ...state,
                isLoadingSubject: false,
                currentSubjectId: action.payload.subject_id,
            };
        case Actions.LOAD_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoadingSubject: false,
                currentSubjectId: action.payload.subject_id,
                currentSubject: { ...action.payload.subject },
            };
        default:
            return { ...state };
    }
};

export default combineReducers({
    user: userReducer,
    tabs: tabsReducer,
    subject: subjectReducer,
});
