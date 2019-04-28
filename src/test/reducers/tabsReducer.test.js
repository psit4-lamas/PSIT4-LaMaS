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
