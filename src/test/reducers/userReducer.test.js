import { userReducer } from '../../main/reducers';
import { Actions } from '../../main/actions';


describe('User reducer', () => {
    let initialState;
    let updatedState;

    beforeEach(() => {
        initialState = {
            isAuthenticated: false,
            isLoadingUser: true,
            userAccessedPathname: '',
        };

        updatedState = Object.assign({}, initialState);
    });

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should set the accessed pathname', () => {
        const action = {
            type: Actions.LOAD_USER,
            payload: '/test',
        };
        updatedState.userAccessedPathname = action.payload;

        expect(userReducer(undefined, action)).toEqual(updatedState);
    });

    it('should finish loading and redirect user', () => {
        const action = { type: Actions.USER_REDIRECT_SUCCESS };
        updatedState.isLoadingUser = false;

        expect(userReducer(undefined, action)).toEqual(updatedState);
    });

    it('should authenticate user', () => {
        const userCredentials = { username: 'testUser' };
        const action = {
            type: Actions.USER_AUTHENTICATED,
            payload: userCredentials,
        };
        updatedState.isAuthenticated = true;
        updatedState.isLoadingUser = false;
        updatedState.userCredentials = userCredentials;

        expect(userReducer(undefined, action)).toEqual(updatedState);
    });

    describe('on login success, should update', () => {
        let action;
        let authenticatedUserState;

        beforeEach(() => {
            action = {
                type: Actions.LOG_IN_SUCCESS,
                payload: {
                    userCredentials: { username: 'testUser' },
                    roles: ['STUDENT'],
                },
            };

            authenticatedUserState = {
                isAuthenticated: true,
                isLoadingUser: false,
                userAccessedPathname: '',
                userCredentials: action.payload.userCredentials,
            };
        });

        it('STUDENT user state', () => {
            authenticatedUserState.roles = action.payload.roles;
            authenticatedUserState.isStudent = true;

            expect(userReducer(undefined, action)).toEqual(authenticatedUserState);
        });

        it('TUTOR user state', () => {
            action.payload.roles = ['TUTOR'];
            authenticatedUserState.roles = action.payload.roles;
            authenticatedUserState.isStudent = false;

            expect(userReducer(undefined, action)).toEqual(authenticatedUserState);
        });

        it('ADMIN user state', () => {
            action.payload.roles = ['ADMIN'];
            authenticatedUserState.roles = action.payload.roles;
            authenticatedUserState.isStudent = false;

            expect(userReducer(undefined, action)).toEqual(authenticatedUserState);
        });
    });

    describe('on logout success, should update user state on event', () => {
        let action;
        let initialUserState;

        beforeEach(() => {
            action = { type: Actions.LOG_OUT_SUCCESS };

            initialUserState = {
                isAuthenticated: false,
                isLoadingUser: true,
                userAccessedPathname: '',
            };
        });

        it('user not yet logged in, finished loading', () => {
            const unauthenticatedUserState = Object.assign({}, initialUserState);
            unauthenticatedUserState.isLoadingUser = false;

            expect(userReducer(initialUserState, action)).toEqual(unauthenticatedUserState);
        });

        it('user wants to logout', () => {
            initialUserState.isLoadingUser = false;
            const unauthenticatedUserState = Object.assign({}, initialUserState);

            expect(userReducer(initialUserState, action)).toEqual(unauthenticatedUserState);
        });
    });
});

// test('reducers', () => {
//     let state;
//     state = reducers({user:{isAuthenticated:false,isLoadingUser:true,userAccessedPathname:''},tabs:{isLoadingTabs:true,activeTabs:[{subject_name:'MQMO',subject_id:'2D0MoB57yByiAQhLSGnK'}]},subject:{isSubmitted:false,isLoadingSubject:true,currentLectureID:'lecture_01',currentSubject:{subject_id:'',subject_name:'',subject_rates:[],assigned_tutors:[],grades:{},lectures:{lecture_01:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_02:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_03:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_04:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_05:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_06:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_07:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_08:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_09:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_10:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_11:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_12:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_13:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_14:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}}}}}}, {type:'LOAD_USER',payload:'/courses/2D0MoB57yByiAQhLSGnK/MQMO'});
//     expect(state).toEqual({user:{isAuthenticated:false,isLoadingUser:true,userAccessedPathname:'/courses/2D0MoB57yByiAQhLSGnK/MQMO'},tabs:{isLoadingTabs:true,activeTabs:[{subject_name:'MQMO',subject_id:'2D0MoB57yByiAQhLSGnK'}]},subject:{isSubmitted:false,isLoadingSubject:true,currentLectureID:'lecture_01',currentSubject:{subject_id:'',subject_name:'',subject_rates:[],assigned_tutors:[],grades:{},lectures:{lecture_01:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_02:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_03:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_04:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_05:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_06:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_07:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_08:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_09:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_10:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_11:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_12:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_13:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}},lecture_14:{is_public:false,name:'',videos:{},lecture_materials:{},exercises:{},comments:{}}}}}});
// });

// it('Reduces', () => {
//     // const user = {
//     //     isAuthenticated: false,
//     //     isLoadingUser: true,
//     //     userAccessedPathname: '',
//     // };
//
//     const action = {
//         type: Actions.LOAD_USER,
//         payload: '/test'
//     };
//
//
//     const updatedState = userReducer(action);
//
//     expect(updatedState).toBe({
//         isAuthenticated: false,
//         isLoadingUser: true,
//         userAccessedPathname: action.payload,
//     });
// });
