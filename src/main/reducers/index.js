import { combineReducers } from 'redux';
import { Actions } from '../actions';


const EMPTY_DEFAULT_SUBJECT = {
    subject_id: '',
    subject_name: '',
    subject_rates: [],
    assigned_tutors: [],
    grades: {},
    lectures: {
        lecture_01: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_02: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_03: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_04: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_05: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_06: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_07: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_08: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_09: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_10: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_11: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_12: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_13: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
        lecture_14: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
    },
};

const initialState = {
    user: {
        isAuthenticated: false,
        isLoadingUser: true,
        userAccessedPathname: '',
    },

    tabs: {
        activeTabs: ['KI2', 'IS', 'PSIT4'],
    },

    subject: {
        ...EMPTY_DEFAULT_SUBJECT,
        isSubmitted: false,
    },
};

const userReducer = (state = initialState.user, action) => {
    switch (action.type) { // NOSONAR
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
    switch (action.type) { // NOSONAR
        default:
            return { ...state };
    }
};

const subjectReducer = (state = initialState.subject, action) => {
    switch (action.type) { // NOSONAR
        case Actions.CREATE_SUBJECT_SUCCESS:
            const subject = Object.assign({}, EMPTY_DEFAULT_SUBJECT);
            return {
                ...subject,
                isSubmitted: true,
                subject_id: action.payload.subjectId,
            };
        case Actions.CREATE_SUBJECT_FAIL:
            return {
                isSubmitted: true,
                subject_id: null,
            };
        default:
            return {
                ...state,
                isSubmitted: false,
            };
    }
};

export default combineReducers({
    user: userReducer,
    tabs: tabsReducer,
    subject: subjectReducer,
});
