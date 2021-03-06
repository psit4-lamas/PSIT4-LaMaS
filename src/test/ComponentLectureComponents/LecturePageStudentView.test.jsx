import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import LecturePageStudentView from '../../main/LectureComponents/LecturePageStudentView';


describe('LecturePageStudentView', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<LecturePageStudentView { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    const props = {
        t: (key) => key,
        subject: {
            assigned_tutors: ['Patrick Baumgartner'],
            averageRating: 3,
            grades: {},
            lectures: {
                lecture_01: {
                    comments: {},
                    exercises: {
                        exercises_01: {
                            name: 'MQMO-Ex01.pdf',
                            nameOnStorage: 'files/55401379-9e0f-4d8a-903e-35e32fb175db.pdf',
                        },
                    },
                    is_public: true,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'mms-modell.mox',
                            nameOnStorage: 'files/fdd95078-367b-4c21-b395-0bcbae435d2f.mox',
                        },
                        lecture_materials_01: {
                            name: 'MQMO-Ex6_Aufgabe1.mox',
                            nameOnStorage: 'files/1a5b430e-ee3d-479b-b940-e81f072d91a5.mox',
                        },
                        lecture_materials_02: {
                            name: 'MQMO-Ex6_Aufgabe2.mox',
                            nameOnStorage: 'files/72ea5169-9c61-4c69-ab62-17ac147fcb4a.mox',
                        },
                        lecture_materials_03: {
                            name: 'Musik.txt',
                            nameOnStorage: 'files/386b2d2d-6a40-4ab5-8a6d-1fa315d6bc73.txt',
                        },
                        lecture_materials_04: {
                            name: 'Anleitung Wahlen.JPG',
                            nameOnStorage: 'files/595f3cda-c74b-4c12-bc12-7b4ece3ed655.JPG',
                        },
                        lecture_materials_05: {
                            name: 'ZweiServer_EineWarteschlange.mox',
                            nameOnStorage: 'files/a5e59969-fe6d-4491-8705-17224d75df1e.mox',
                        },
                        lecture_materials_06: {
                            name: 'Torte.txt',
                            nameOnStorage: 'files/ed1ecd2a-e0b5-4f45-b317-268436da3863.txt',
                        },
                    },
                    name: 'this is a difficult lecture!',
                    videos: {
                        videos_00: {
                            name: 'realshort.mp4',
                            nameOnStorage: 'files/9786e06c-3be2-4090-80f2-6fc28d2eb2dd.mp4',
                        },
                        videos_01: {
                            name: 'cockatoo.mp4',
                            nameOnStorage: 'files/27e0a27e-dc60-4e10-8c80-ae9143333a75.mp4',
                        },
                        videos_02: {
                            name: 'SF1_Bern - Kopie22.mp4',
                            nameOnStorage: 'files/fcf7934d-6e09-4595-80ff-f1aca768f1c9.mp4',
                        },
                    },
                },
                lecture_02: {
                    comments: {},
                    exercises: {},
                    is_public: true,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'Torte.txt',
                            nameOnStorage: 'files/e7d161dc-2bdf-4e2e-acf2-233a626e0556.txt',
                        },
                    },
                    name: 'test test tit',
                    videos: {},
                },
                lecture_03: {
                    comments: {},
                    exercises: {
                        exercises_00: {
                            name: 'MyThreads.pdf',
                            nameOnStorage: 'files/e7636ad6-8e68-4293-a495-070a04280c5c.pdf',
                        },
                    },
                    is_public: false,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'Torte.txt',
                            nameOnStorage: 'files/58b9a9aa-f7d8-4b31-905e-edfad2ab61df.txt',
                        },
                    },
                    name: 'this is lecture very di',
                    videos: {},
                },
                lecture_04: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'Musik.txt',
                            nameOnStorage: 'files/992b38fc-a16b-4d96-bcb8-30bbcc6685b1.txt',
                        },
                    },
                    name: 'this is lecture 6666',
                    videos: {
                        videos_00: {
                            name: 'MOV01165.MPG',
                            nameOnStorage: 'files/19842f82-01af-45b1-94a1-a9b021885663.MPG',
                        },
                    },
                },
                lecture_05: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture MEWO',
                    videos: {},
                },
                lecture_06: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'mms-modell.mox',
                            nameOnStorage: 'files/9ecf48d7-b1b7-4681-953a-dbe7b55f8cdf.mox',
                        },
                        lecture_materials_01: {
                            name: 'Musik.txt',
                            nameOnStorage: 'files/7d19e0c4-9160-4ff6-9d6a-36af7cc143cf.txt',
                        },
                    },
                    name: 'this is lecture 6',
                    videos: {
                        videos_00: {
                            name: 'SF1_Bern - Kopie22.mp4',
                            nameOnStorage: 'files/39adb198-3d4f-4c35-b4f4-4deff67f4c29.mp4',
                        },
                    },
                },
                lecture_07: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture996633',
                    videos: {},
                },
                lecture_08: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 8',
                    videos: {
                        videos_00: {
                            name: 'SF1_Bern.wmv',
                            nameOnStorage: 'files/d5d128dd-f443-4d34-82c6-8454f1e6d6c9.wmv',
                        },
                    },
                },
                lecture_09: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 9',
                    videos: {
                        videos_00: {
                            name: 'WP_20140318_002.mp4',
                            nameOnStorage: 'files/932d9d92-0c15-4db8-83fe-7c3e5c8ec860.mp4',
                        },
                    },
                },
                lecture_10: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 10',
                    videos: {},
                },
                lecture_11: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {
                        lecture_materials_00: {
                            name: 'Musik.txt',
                            nameOnStorage: 'files/fae8c3e8-df7e-42d7-8a0b-0a1084817a36.txt',
                        },
                    },
                    name: 'this is lecture 11',
                    videos: {},
                },
                lecture_12: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 12',
                    videos: {},
                },
                lecture_13: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 13',
                    videos: {},
                },
                lecture_14: {
                    comments: {},
                    exercises: {},
                    is_public: false,
                    lecture_materials: {},
                    name: 'this is lecture 14',
                    videos: {},
                },
            },
            subject_id: '2D0MoB57yByiAQhLSGnK',
            subject_name: 'MQMO',
            subject_rates: {
                tdPkwA4XH7aa4KSipjg07lRgEdg1: 1,
                undefined: 5,
            },
        },

        subject_id: 'test123',
        lecture: {
            comments: {},
            exercises: {
                exercises_01: {
                    name: 'MQMO-Ex01.pdf',
                    nameOnStorage: 'files/55401379-9e0f-4d8a-903e-35e32fb175db.pdf',
                },
            },
            is_public: true,
            lecture_materials: {
                lecture_materials_00: {
                    name: 'mms-modell.mox',
                    nameOnStorage: 'files/fdd95078-367b-4c21-b395-0bcbae435d2f.mox',
                },
                lecture_materials_01: {
                    name: 'MQMO-Ex6_Aufgabe1.mox',
                    nameOnStorage: 'files/1a5b430e-ee3d-479b-b940-e81f072d91a5.mox',
                },
                lecture_materials_02: {
                    name: 'MQMO-Ex6_Aufgabe2.mox',
                    nameOnStorage: 'files/72ea5169-9c61-4c69-ab62-17ac147fcb4a.mox',
                },
                lecture_materials_03: {
                    name: 'Musik.txt',
                    nameOnStorage: 'files/386b2d2d-6a40-4ab5-8a6d-1fa315d6bc73.txt',
                },
                lecture_materials_04: {
                    name: 'Anleitung Wahlen.JPG',
                    nameOnStorage: 'files/595f3cda-c74b-4c12-bc12-7b4ece3ed655.JPG',
                },
                lecture_materials_05: {
                    name: 'ZweiServer_EineWarteschlange.mox',
                    nameOnStorage: 'files/a5e59969-fe6d-4491-8705-17224d75df1e.mox',
                },
                lecture_materials_06: {
                    name: 'Torte.txt',
                    nameOnStorage: 'files/ed1ecd2a-e0b5-4f45-b317-268436da3863.txt',
                },
            },
            name: 'this is a difficult lecture!',
            videos: {
                videos_00: {
                    name: 'realshort.mp4',
                    nameOnStorage: 'files/9786e06c-3be2-4090-80f2-6fc28d2eb2dd.mp4',
                },
                videos_01: {
                    name: 'cockatoo.mp4',
                    nameOnStorage: 'files/27e0a27e-dc60-4e10-8c80-ae9143333a75.mp4',
                },
                videos_02: {
                    name: 'SF1_Bern - Kopie22.mp4',
                    nameOnStorage: 'files/fcf7934d-6e09-4595-80ff-f1aca768f1c9.mp4',
                },
            },
        },
        lectureId: 'lecture_01',
        lectureTitle: 'this is lecture title',
        nameOnStorage: 'files/def',
        videoUrl: 'https://example.com',
        onSelectFileClick: jest.fn(),
        onSelectVideoClick: jest.fn(),
        showVideo: jest.fn(),
        addRating: jest.fn(),
        currentRating: 5,
        breadcrumbComponent: jest.fn(),
        user: {
            isAuthenticated: true,
            isLoadingUser: false,
            userAccessedPathname: '',
            userCredentials: {
                uid: 'tdPkwA4XH7aa4KSipjg07lRgEdg1',
                displayName: null,
                photoURL: null,
                email: 'student@students.zhaw.ch',
                emailVerified: false,
                phoneNumber: null,
                isAnonymous: false,
                providerData: [
                    {
                        uid: 'student@students.zhaw.ch',
                        displayName: null,
                        photoURL: null,
                        email: 'student@students.zhaw.ch',
                        phoneNumber: null,
                        providerId: 'password',
                    },
                ],
                apiKey: 'AIzaSyB49zT7KVrVGXrvhAcVd47cQXV9wsVeDLo',
                appName: '[DEFAULT]',
                authDomain: 'fir-and-react-55a5a.firebaseapp.com',
                stsTokenManager: {
                    apiKey: 'AIzaSyB49zT7KVrVGXrvhAcVd47cQXV9wsVeDLo',
                    refreshToken:
                        'AEu4IL0NPaMz3Jw0KxbZjLmYQYtqHmDQs4o-pzY_UxIFsA5y_2X5ZCDuSsPEu41v271fk5WoU4ykXzUqGWNuDk-f2dp4QYTI3R6cwzMOE9xucOp6lpwGLpZuR9sybdw5i5VaNExjOCSlSKNAzWRIJHdqOuTsc3CKRvmfOpFvmg_G-9bhL5Zru-pDhR6hAFUcpxm_UBgORaSyeEIRaq0VQJS07jJ84lmLXQAxR01lAqpo9ZWfc4RUIaQ',
                    accessToken:
                        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1NmMzZGQyMWQwZmVmODgyZTA5ZTBkODY5MWNhNWM3ZjJiMGQ2MjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWFuZC1yZWFjdC01NWE1YSIsImF1ZCI6ImZpci1hbmQtcmVhY3QtNTVhNWEiLCJhdXRoX3RpbWUiOjE1NTY0NjQxOTYsInVzZXJfaWQiOiJ0ZFBrd0E0WEg3YWE0S1NpcGpnMDdsUmdFZGcxIiwic3ViIjoidGRQa3dBNFhIN2FhNEtTaXBqZzA3bFJnRWRnMSIsImlhdCI6MTU1NjQ2NDE5NiwiZXhwIjoxNTU2NDY3Nzk2LCJlbWFpbCI6InN0dWRlbnRAc3R1ZGVudHMuemhhdy5jaCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdHVkZW50QHN0dWRlbnRzLnpoYXcuY2giXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.rgXCGZVNukxVz8QgDXfvoOabrx9UlnBIu6vPkUFZMo-X0RNGnSbFZXyDil3cjH-DRWGqi-yXs6VOyAmSyqrB1PH51yNOCcHJYmSaDGhWMXD9FX3eLYz8hKxY82a7MZnKR1K4okaFR2lSo-24BTFQoOan5FJa6Us4Xh1beOyyWk21VYT-oGj_luwfotYx7TqlkSyRqTadrKMfFXCyEZztdjmHtaSj2iCMF2gbwbDxOOvtd5sT05qYCdmGxogtNzTzWVfAXGRsUvLAFgvR-xKFVSYx760fsEaLSaYhoKpk6tbId9icpMbEciyWxDjgz63JnqAgCGQT27Gdgo9hnNYTsQ',
                    expirationTime: 1556467796292,
                },
                redirectEventId: null,
                lastLoginAt: '1556464196038',
                createdAt: '1556377066788',
            },
            roles: ['STUDENT'],
            isStudent: true,
        },
    };

    let lecturePageStudentViewComponent;

    beforeEach(() => {
        const component = <LecturePageStudentView { ...props } />;

        lecturePageStudentViewComponent = shallow(component);
    });

    afterEach(() => {
        lecturePageStudentViewComponent.unmount();
    });

    it('should render correctly', () => {
        expect(lecturePageStudentViewComponent).toMatchSnapshot();
    });
});
