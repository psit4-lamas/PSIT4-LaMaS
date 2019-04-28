import { subjectReducer } from '../../main/reducers';
import { Actions } from '../../main/actions';


describe('Subject reducer', () => {
    const EMPTY_DEFAULT_SUBJECT = {
        subject_id: '',
        subject_name: '',
        subject_rates: [],
        assigned_tutors: [],
        grades: {},
        lectures: {
            lecture_01: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_02: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_03: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_04: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_05: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_06: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_07: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_08: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_09: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_10: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_11: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_12: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_13: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
            lecture_14: { is_public: false, name: '', videos: {}, lecture_materials: {}, exercises: {}, comments: {} },
        },
    };

    let initialState;
    let updatedSubjectState;

    beforeEach(() => {
        initialState = {
            isSubmitted: false,
            isLoadingSubject: true,
            currentLectureID: 'lecture_01',
            currentSubject: {
                ...EMPTY_DEFAULT_SUBJECT,
                averageRating: null,
            },
        };

        updatedSubjectState = {
            isSubmitted: false,
            isLoadingSubject: false,
            currentLectureID: 'lecture_01',
            currentSubject: {
                ...EMPTY_DEFAULT_SUBJECT,
                averageRating: null,
            },
        };
    });

    it('should return the initial state', () => {
        expect(subjectReducer(undefined, {})).toEqual(initialState);
    });

    it('on CREATE_SUBJECT_SUCCESS, should update subject state', () => {
        const actionCreate = {
            type: Actions.CREATE_SUBJECT_SUCCESS,
            payload: {
                subjectId: '1a2b3c4d5e',
                subject_name: 'PSIT4',
                assigned_tutors: ['Tutor1', 'Tutor2'],
            },
        };

        updatedSubjectState.isSubmitted = true;
        updatedSubjectState.currentSubject.subject_id = actionCreate.payload.subjectId;
        updatedSubjectState.currentSubject.subject_name = actionCreate.payload.subject_name;
        updatedSubjectState.currentSubject.assigned_tutors = actionCreate.payload.assigned_tutors;
        delete updatedSubjectState.currentSubject.averageRating;

        expect(subjectReducer(undefined, actionCreate)).toEqual(updatedSubjectState);
    });

    it('on CREATE_SUBJECT_SUCCESS, should update subject state with "subject%20name%20with%20space"', () => {
        const actionCreate = {
            type: Actions.CREATE_SUBJECT_SUCCESS,
            payload: {
                subjectId: '1a2b3c4d5e',
                subject_name: 'subject%20name%20with%20space',
                assigned_tutors: ['Tutor1', 'Tutor2'],
            },
        };

        updatedSubjectState.isSubmitted = true;
        updatedSubjectState.currentSubject.subject_id = actionCreate.payload.subjectId;
        updatedSubjectState.currentSubject.subject_name = actionCreate.payload.subject_name.replace('%20', ' ');
        updatedSubjectState.currentSubject.assigned_tutors = actionCreate.payload.assigned_tutors;
        delete updatedSubjectState.currentSubject.averageRating;

        expect(subjectReducer(undefined, actionCreate)).toEqual(updatedSubjectState);
    });

    it('on SUBJECT_INSERT_HEAD, should return the initial state', () => {
        const actionCreate = {
            type: Actions.SUBJECT_INSERT_HEAD,
            payload: {
                name: 'PSIT4',
                subject_id: '1a2b3c4d5e',
            },
        };

        expect(subjectReducer(undefined, actionCreate)).toEqual(initialState);
    });

    it('on LEAVE_CREATE_SUBJECT, should update subject state', () => {
        const actionCreate = { type: Actions.LEAVE_CREATE_SUBJECT };

        expect(subjectReducer(undefined, actionCreate)).toEqual(updatedSubjectState);
    });

    it('on CREATE_SUBJECT_FAIL, should update subject state', () => {
        const actionCreate = { type: Actions.CREATE_SUBJECT_FAIL };

        updatedSubjectState.isSubmitted = true;
        updatedSubjectState.currentSubject = { subject_id: null };
        delete updatedSubjectState.currentSubject.averageRating;

        expect(subjectReducer(undefined, actionCreate)).toEqual(updatedSubjectState);
    });

    it('on LOAD_SUBJECT_SUCCESS, should update subject state with existing ratings', () => {
        const actionLoadSuccess = {
            type: Actions.LOAD_SUBJECT_SUCCESS,
            payload: {
                subject: {
                    ...EMPTY_DEFAULT_SUBJECT,
                    subject_rates: [1, 5, 3, 4, 2],
                },
                subject_id: '1a2b3c4d5e',
            },
        };
        const rates = actionLoadSuccess.payload.subject.subject_rates;
        const avg = rates.reduce((total, current) => { return total + current }, 0) / rates.length;

        updatedSubjectState.isLoadingSubject = false;
        updatedSubjectState.currentSubject.subject_rates = actionLoadSuccess.payload.subject.subject_rates;
        updatedSubjectState.currentSubject.subject_id = actionLoadSuccess.payload.subject_id;
        updatedSubjectState.currentSubject.averageRating = avg;

        expect(subjectReducer(undefined, actionLoadSuccess)).toEqual(updatedSubjectState);
    });

    it('on LOAD_SUBJECT_SUCCESS, should update subject state without ratings', () => {
        const actionLoadSuccess = {
            type: Actions.LOAD_SUBJECT_SUCCESS,
            payload: {
                subject: {
                    ...EMPTY_DEFAULT_SUBJECT,
                },
                subject_id: '1a2b3c4d5e',
            },
        };

        updatedSubjectState.isLoadingSubject = false;
        updatedSubjectState.currentSubject.subject_rates = actionLoadSuccess.payload.subject.subject_rates;
        updatedSubjectState.currentSubject.subject_id = actionLoadSuccess.payload.subject_id;
        updatedSubjectState.currentSubject.averageRating = 0;

        expect(subjectReducer(undefined, actionLoadSuccess)).toEqual(updatedSubjectState);
    });

    it('on SET_CURRENT_LECTURE, should update subject state', () => {
        const actionSetCurrentLecture = {
            type: Actions.SET_CURRENT_LECTURE,
            payload: 'lecture_01',
        };

        updatedSubjectState.isLoadingSubject = false;
        updatedSubjectState.currentLectureID = actionSetCurrentLecture.payload;

        expect(subjectReducer(undefined, actionSetCurrentLecture)).toEqual(updatedSubjectState);
    });

    it('on SAVE_LECTURE_START, should update subject state', () => {
        const actionSaveLectureStart = { type: Actions.SAVE_LECTURE_START };

        updatedSubjectState.isSubmitted = true;
        updatedSubjectState.isLoadingSubject = true;

        expect(subjectReducer(undefined, actionSaveLectureStart)).toEqual(updatedSubjectState);
    });

    it('on SAVE_LECTURE_SUCCESS, should update subject state', () => {
        const actionSaveLectureSuccess = { type: Actions.SAVE_LECTURE_SUCCESS };

        updatedSubjectState.isSubmitted = true;
        updatedSubjectState.isLoadingSubject = false;
        updatedSubjectState.isLoadingSubject = false;

        expect(subjectReducer(undefined, actionSaveLectureSuccess)).toEqual(updatedSubjectState);
    });
});
