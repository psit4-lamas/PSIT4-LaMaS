import { combineReducers } from 'redux';
import { Actions } from '../actions';
import { isEmptyObject } from '../../utils';

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
        isLoadingTabs: true,
        activeTabs: [],
        subjectLinks: [],
    },

    subject: {
        isSubmitted: false,
        isLoadingSubject: true,
        currentLectureID: 'lecture_01',
        currentSubject: {
            ...EMPTY_DEFAULT_SUBJECT,
        },
    },
};

const userReducer = (state = initialState.user, action) => {
    switch (action.type) { // NOSONAR
        case Actions.LOAD_USER:
            // Started fetching user from firebase:
            // save the requested pathname and render LoadingPage
            return {
                ...state,
                isLoadingUser: false,
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
            return {
                ...state,
                ...action.payload,
                isAuthenticated: !!action.payload,
                isLoadingUser: false,
            };
        case Actions.LOG_IN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: !!action.payload,
                isLoadingUser: false,
                roles: action.payload.roles,
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
        case Actions.LOADING_TABS:
            return {
                isLoadingTabs: true,
            };
        case Actions.SUBJECT_INSERT_HEAD:
            const found = state.subjectLinks.find(function (subject) {
                return !isEmptyObject(subject) && subject.subject_id === action.payload.subject_id;
            });

            // TODO: I have the impression we are doing two things in this reducer:
            //       - handling the add/remove active tabs (a tab should appear only if the subj content is requested)
            //       - handling the bookmarked subjects (the list of all bookmarked subjects should be available)
            // TODO: split this logic into 2 different reducers (can be fixed after Sprint 2)
            if (found === undefined) {
                const activeTabs = state.activeTabs.slice();
                activeTabs.push(action.payload.name);

                const subjectLinks = state.subjectLinks.slice();
                subjectLinks.push({ ...action.payload });

                return {
                    ...state,
                    isLoadingTabs: false,
                    activeTabs: activeTabs,
                    subjectLinks: subjectLinks,
                };
            } else {
                return { ...state };
            }
        case Actions.SUBJECT_REMOVE_HEAD:
            const activeTabs = state.activeTabs.filter(function (tab) {
                return !!tab && tab !== action.payload.name;
            });

            const subjectLinks = state.subjectLinks.filter(function (subject) {
                return !isEmptyObject(subject) && subject.subject_id !== action.payload.subject_id;
            });

            return {
                ...state,
                activeTabs: activeTabs,
                subjectLinks: subjectLinks,
            };
        default:
            return { ...state };
    }
};

const subjectReducer = (state = initialState.subject, action) => {
    switch (action.type) { // NOSONAR
        case Actions.CREATE_SUBJECT_SUCCESS:
            const subject = Object.assign({}, EMPTY_DEFAULT_SUBJECT);
            return {
                isSubmitted: true,
                isLoadingSubject: false,
                currentLectureID: 'lecture_01',
                currentSubject: {
                    ...subject,
                    subject_id: action.payload.subjectId,
                    subject_name: action.payload.subject_name,
                    assigned_tutors: action.payload.assigned_tutors.slice(),
                },
            };

        case Actions.SUBJECT_INSERT_HEAD:
            return { ...state };

        case Actions.LEAVE_CREATE_SUBJECT:
            return {
                ...state,
                isSubmitted: false,
            };

        case Actions.CREATE_SUBJECT_FAIL:
            return {
                isSubmitted: true,
                isLoadingSubject: false,
                currentLectureID: 'lecture_01',
                currentSubject: {
                    subject_id: null,
                },
            };
        case Actions.LOAD_SUBJECT_SUCCESS:
            return {
                ...state,
                isSubmitted: false,
                isLoadingSubject: false,
                currentSubject: {
                    ...action.payload.subject,
                    subject_id: action.payload.subject_id,
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
                isLoadingSubject: true,
            };

        case Actions.SAVE_LECTURE_SUCCESS:
            return {
                ...state,
                isLoadingSubject: false,
            };

        case Actions.SET_NEW_LECTURE_TITLE:
            const currentLecture = state.currentLectureID;

            return {
                ...state,
                currentSubject: {
                    ...state.currentSubject,
                    lectures: {
                        ...state.currentSubject.lectures,
                        [currentLecture]: {
                            ...state.currentSubject.lectures[currentLecture],
                            name: action.payload,
                        },
                    },
                },
            };

        default:
            return {
                ...state,
                isSubmitted: false,
                isLoadingSubject: true,
            };
    }
};

export default combineReducers({
    user: userReducer,
    tabs: tabsReducer,
    subject: subjectReducer,
});
