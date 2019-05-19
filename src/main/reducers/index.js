import { combineReducers } from 'redux';
import { Actions } from '../actions';
import { isEmptyObject } from '../../utils';
import { UserRoles } from '../../utils';

const EMPTY_DEFAULT_SUBJECT = {
    subject_id: '',
    subject_name: '',
    subject_full_name: '',
    subject_rates: [],
    assigned_tutors: [],
    grant_access_classes: [],
    overview: {
        topics: '',
        labs: '',
        exam: '',
    },
    grades: {},
    lectures: {
        lecture_01: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_02: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_03: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_04: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_05: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_06: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_07: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_08: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_09: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_10: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_11: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_12: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_13: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
        },
        lecture_14: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: [],
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
        isLoadingTabs: true,
        activeTabs: [],
    },

    subject: {
        isSubmitted: false,
        isLoadingSubject: true,
        currentLectureID: 'lecture_01',
        currentComments: [],
        currentSubject: {
            ...EMPTY_DEFAULT_SUBJECT,
            averageRating: null,
        },
    },
};

const userReducer = (state = initialState.user, action) => { // NOSONAR
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
                isLoadingUser: false,
                userAccessedPathname: '',
            };
        case Actions.USER_AUTHENTICATED:
            const userCredentials = Object.assign({}, action.payload);
            const username = userCredentials.user.email ? userCredentials.user.email.split('@')[0] : '-';
            userCredentials.username = username;
            return {
                ...state,
                userCredentials: userCredentials,
                isAuthenticated: !!action.payload,
                isLoadingUser: false,
            };
        case Actions.LOG_IN_SUCCESS:
            const userRoles = action.payload.roles;
            const user_credentials = Object.assign({}, action.payload.userCredentials);
            const user_name = user_credentials.email ? user_credentials.email.split('@')[0] : '-';
            user_credentials.username = user_name;

            return {
                ...state,
                ...action.payload, // { userCredentials: { ... }, roles: [ ... ] }
                isAuthenticated: !!action.payload,
                isLoadingUser: false,
                isStudent: !!userRoles && userRoles.includes(UserRoles.STUDENT),
                isAdmin: !!userRoles && userRoles.includes(UserRoles.ADMIN),
                userCredentials: user_credentials,
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

const tabsReducer = (state = initialState.tabs, action) => { // NOSONAR
    // TODO: add more reducer case according to the success fetch user's bookmarked subjects action
    switch (action.type) { // NOSONAR
        case Actions.SUBJECT_INSERT_HEAD:
            const found = state.activeTabs.find(function (tab) {
                return !isEmptyObject(tab) && tab.subject_id === action.payload.subject_id;
            });

            // TODO: I have the impression we are doing two things in this reducer:
            //       - handling the add/remove active tabs (a tab should appear only if the subj content is requested)
            //       - handling the bookmarked subjects (the list of all bookmarked subjects should be available)
            // TODO: split this logic into 2 different reducers (can be fixed after Sprint 2)
            if (found === undefined) {
                const activeTabs = state.activeTabs.slice();
                activeTabs.push({
                    subject_name: action.payload.name.replace(/%20/g, ' '),
                    subject_id: action.payload.subject_id,
                });

                return {
                    ...state,
                    isLoadingTabs: false,
                    activeTabs: activeTabs,
                };
            } else {
                return { ...state };
            }
        case Actions.SUBJECT_REMOVE_HEAD:
            const activeTabs = state.activeTabs.filter(function (tab) {
                return !isEmptyObject(tab) && tab.subject_id !== action.payload.subject_id;
            });

            return {
                ...state,
                isLoadingTabs: false,
                activeTabs: activeTabs,
            };
        default:
            return { ...state };
    }
};

const subjectReducer = (state = initialState.subject, action) => { // NOSONAR
    switch (action.type) { // NOSONAR
        case Actions.LOADING_SUBJECT:
            return {
                ...state,
                isLoadingSubject: true,
            };
        case Actions.CREATE_SUBJECT_SUCCESS:
            const subject = Object.assign({}, EMPTY_DEFAULT_SUBJECT);
            return {
                isSubmitted: true,
                isLoadingSubject: false,
                currentLectureID: 'lecture_01',
                currentComments: [],
                currentSubject: {
                    ...subject,
                    subject_id: action.payload.subjectId,
                    subject_name: action.payload.subject_name.replace(/%20/g, ' '),
                    subject_full_name: action.payload.subject_full_name ? action.payload.subject_full_name.replace(/%20/g, ' ') : '',
                    assigned_tutors: action.payload.assigned_tutors.slice(),
                    grant_access_classes: action.payload.grant_access_classes.slice(),
                    overview: Object.assign({}, action.payload.overview),
                },
            };

        case Actions.SUBJECT_INSERT_HEAD:
            return { ...state };

        case Actions.LEAVE_CREATE_SUBJECT:
            return {
                ...state,
                isSubmitted: false,
                isLoadingSubject: false,
            };

        case Actions.CREATE_SUBJECT_FAIL:
            return {
                isSubmitted: true,
                isLoadingSubject: false,
                currentLectureID: 'lecture_01',
                currentComments: [],
                currentSubject: {
                    subject_id: null,
                },
            };
        case Actions.LOAD_SUBJECT_SUCCESS:
            let total = 0;
            let avg = 0;
            const rates = action.payload.subject.subject_rates;
            const keys = Object.keys(rates);
            for (let i = 0; i < keys.length; i++) {
                total += rates[keys[i]];
            }
            avg = keys.length ? total / keys.length : 0;
            let currentComments = state.currentComments;
            if (action.payload.subject_id !== state.currentSubject.subject_id) {
                currentComments = [];
            }
            return {
                ...state,
                isSubmitted: false,
                isLoadingSubject: false,
                currentComments,
                currentSubject: {
                    ...action.payload.subject,
                    lectures: {
                        ...action.payload.subject.lectures,
                        [state.currentLectureID]: {
                            ...action.payload.subject.lectures[state.currentLectureID],
                            comments: state.currentComments,
                        },
                    },
                    subject_id: action.payload.subject_id,
                    averageRating: avg,
                },
            };

        case Actions.ADD_COMMENT:
            let comments = [];
            if (state.currentSubject.lectures[state.currentLectureID].comments) {
                comments = state.currentSubject.lectures[state.currentLectureID].comments;
            }
            comments.push(action.payload.comment);
            return {
                ...state,
                currentComments: comments,
                currentSubject: {
                    ...state.currentSubject,
                    lectures: {
                        ...state.currentSubject.lectures,
                        [state.currentLectureID]: {
                            ...state.currentSubject.lectures[state.currentLectureID],
                            comments: comments,
                        },
                    },
                },
            };

        case Actions.RESET_COMMENTS:
            return {
                ...state,
                currentComments: [],
                currentSubject: {
                    ...state.currentSubject,
                    lectures: {
                        ...state.currentSubject.lectures,
                        [state.currentLectureID]: {
                            ...state.currentSubject.lectures[state.currentLectureID],
                            comments: [],
                        },
                    },
                },
            };

        case Actions.SET_CURRENT_LECTURE:
            return {
                ...state,
                isSubmitted: false,
                isLoadingSubject: false,
                currentLectureID: action.payload,
            };

        case Actions.SAVE_LECTURE_START:
            return {
                ...state,
                isSubmitted: true,
                isLoadingSubject: true,
            };

        case Actions.SAVE_LECTURE_SUCCESS:
            return {
                ...state,
                isSubmitted: true,
                isLoadingSubject: false,
            };

        default:
            return {
                ...state,
 //               isSubmitted: false,
 //               isLoadingSubject: true,
            };
    }
};


// Named exports to be called in the tests
export { userReducer, tabsReducer, subjectReducer };

export default combineReducers({
    user: userReducer,
    tabs: tabsReducer,
    subject: subjectReducer,
});
