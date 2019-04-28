import { tabsReducer } from '../../main/reducers';
import { Actions } from '../../main/actions';


describe('Tabs reducer', () => {

    it('should return the initial state', () => {
        const initialState = {
            isLoadingTabs: true,
            activeTabs: [],
        };

        expect(tabsReducer(undefined, {})).toEqual(initialState);
    });

    describe('on SUBJECT_INSERT_HEAD, should update', () => {
        let actionInsert;
        let initialTabsState;
        let updatedTabsState;

        beforeEach(() => {
            actionInsert = {
                type: Actions.SUBJECT_INSERT_HEAD,
                payload: {
                    name: 'PSIT4',
                    subject_id: '1a2b3c4d5e',
                },
            };

            initialTabsState = {
                isLoadingTabs: true,
                activeTabs: [],
            };

            updatedTabsState = {
                isLoadingTabs: false,
                activeTabs: [
                    {
                        subject_name: actionInsert.payload.name,
                        subject_id: actionInsert.payload.subject_id,
                    },
                ],
            };
        });

        it('an empty tabs state', () => {
            expect(tabsReducer(initialTabsState, actionInsert)).toEqual(updatedTabsState);
        });

        it('tabs state, with new "subject%20name%20with%20space" tab', () => {
            actionInsert.payload.name = 'subject%20name%20with%20space';
            updatedTabsState.activeTabs[0].subject_name = actionInsert.payload.name.replace('%20', ' ');

            expect(tabsReducer(initialTabsState, actionInsert)).toEqual(updatedTabsState);
        });

        it('a non-empty tabs state, with missing "PSIT4" tab', () => {
            initialTabsState.activeTabs = [
                {
                    subject_name: 'PSIT3',
                    subject_id: '0z9y8x7w6v',
                },
            ];

            updatedTabsState.activeTabs = initialTabsState.activeTabs.slice();
            updatedTabsState.activeTabs.push({
                subject_name: actionInsert.payload.name,
                subject_id: actionInsert.payload.subject_id,
            });

            expect(tabsReducer(initialTabsState, actionInsert)).toEqual(updatedTabsState);
        });

        it('a non-empty tabs state, with existing "PSIT4" tab', () => {
            initialTabsState.activeTabs = [
                {
                    subject_name: actionInsert.payload.name,
                    subject_id: actionInsert.payload.subject_id,
                },
            ];

            expect(tabsReducer(initialTabsState, actionInsert)).toEqual(initialTabsState);
        });
    });

    describe('on SUBJECT_REMOVE_HEAD, should update', () => {
        let actionRemove;
        let initialTabsState;
        let updatedTabsState;

        beforeEach(() => {
            actionRemove = {
                type: Actions.SUBJECT_REMOVE_HEAD,
                payload: {
                    name: 'PSIT4',
                    subject_id: '1a2b3c4d5e',
                },
            };

            initialTabsState = {
                isLoadingTabs: true,
                activeTabs: [],
            };

            updatedTabsState = {
                isLoadingTabs: false,
                activeTabs: [],
            };
        });

        it('an empty tabs state', () => {
            expect(tabsReducer(initialTabsState, actionRemove)).toEqual(updatedTabsState);
        });

        it('tabs state, with existing tab "subject%20name%20with%20space" to be removed', () => {
            actionRemove.payload.name = 'subject%20name%20with%20space';
            initialTabsState.activeTabs = [
                {
                    subject_name: actionRemove.payload.name,
                    subject_id: actionRemove.payload.subject_id,
                },
            ];

            expect(tabsReducer(initialTabsState, actionRemove)).toEqual(updatedTabsState);
        });

        it('tabs state, with missinf tab "subject%20name%20with%20space" to be removed', () => {
            actionRemove.payload.name = 'subject%20name%20with%20space';
            initialTabsState.activeTabs = [
                {
                    subject_name: 'PSIT3',
                    subject_id: '0z9y8x7w6v',
                },
            ];
            updatedTabsState.activeTabs = initialTabsState.activeTabs.slice();

            expect(tabsReducer(initialTabsState, actionRemove)).toEqual(updatedTabsState);
        });

        it('a non-empty tabs state, with missing "PSIT4" tab', () => {
            initialTabsState.activeTabs = [
                {
                    subject_name: 'PSIT3',
                    subject_id: '0z9y8x7w6v',
                },
            ];
            updatedTabsState.activeTabs = initialTabsState.activeTabs.slice();

            expect(tabsReducer(initialTabsState, actionRemove)).toEqual(updatedTabsState);
        });

        it('a non-empty tabs state, with existing "PSIT4" tab', () => {
            initialTabsState.activeTabs = [
                {
                    subject_name: actionRemove.payload.name,
                    subject_id: actionRemove.payload.subject_id,
                },
            ];

            expect(tabsReducer(initialTabsState, actionRemove)).toEqual(updatedTabsState);
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
//     const updatedState = tabsReducer(action);
//
//     expect(updatedState).toBe({
//         isAuthenticated: false,
//         isLoadingUser: true,
//         userAccessedPathname: action.payload,
//     });
// });
