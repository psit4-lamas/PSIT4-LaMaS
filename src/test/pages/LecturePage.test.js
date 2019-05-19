import React from 'react';
import { shallow } from 'enzyme';
import { LecturePage } from '../../main/pages/LecturePage';
import LecturePageTutorView from '../../main/LectureComponents/LecturePageTutorView';
import LecturePageStudentView from '../../main/LectureComponents/LecturePageStudentView';

describe('LecturePage', () => {
    let renderedComponent;
    const result = {
        subject_id: '2D0MoB57yByiAQhLSGnK',
        subject: {
            assigned_tutors: ['Patrick Baumgartner'],
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
                    name: 'this is lecture MEW',
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
            subject_rates: [],
        },
    };

    const loadSubject = jest.fn().mockResolvedValue(result);

    //note: the subject is loaded via the callback
    const props = {
        loadSubject,
        selectLecture: jest.fn(),
        fetchFile: jest.fn().mockResolvedValue('http://example.com'),
        loadComments: jest.fn(),
        saveComment: jest.fn(),
        user: {
            userCredentials: { uid: 'userId' },
        },
        isStudent: true,
        match: {
            params: 'SubjectIdFromParams',
        },
        currentSubject: result.subject,
    };

    const propsNotStudent = {
        loadSubject,
        selectLecture: jest.fn(),
        fetchFile: jest.fn().mockResolvedValue('http://example.com'),
        loadComments: jest.fn(),
        saveComment: jest.fn(),
        user: {
            userCredentials: { uid: 'userId' },
        },
        isStudent: false,
        match: {
            params: 'SubjectIdFromParams',
        },
        currentSubject: result.subject,
    };

    beforeEach(() => {
        const component = <LecturePage t={ (key) => key } { ...props } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot if not student', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;

        renderedComponent = shallow(component);

        expect(renderedComponent).toMatchSnapshot();
    });

    it('should render breadcrumb component on click', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;

        renderedComponent = shallow(component);
        renderedComponent.find(LecturePageTutorView).prop('breadcrumbComponent')();

        expect(renderedComponent).toMatchSnapshot();
    });

    it('should handle lecture menu click correctly', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;

        renderedComponent = shallow(component);
        const event = {
            target: {
                id: 'lecture_02',
            },
        };
        renderedComponent.find(LecturePageTutorView).prop('handleLectureMenuClick')(event);

        expect(renderedComponent.state('lectureID')).toEqual('lecture_02');
        expect(renderedComponent.state('currentLecture')).toEqual(propsNotStudent.currentSubject.lectures.lecture_02);
        expect(renderedComponent.state('lectureName')).toEqual(propsNotStudent.currentSubject.lectures.lecture_02.name);
        expect(renderedComponent.state('videoUrl')).toEqual('');
        expect(renderedComponent.state('nameOnStorage')).toEqual('');
        expect(propsNotStudent.selectLecture).toHaveBeenCalledWith('lecture_02');
    });

    it('should handle click on file correctly from tutorView', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;
        window.open = jest.fn();
        renderedComponent = shallow(component);
        const event = 'files/datei.mp4';
        renderedComponent.find(LecturePageTutorView).prop('onSelectFileClick')(event);

        expect(propsNotStudent.fetchFile).toHaveBeenCalledWith(event);
    });

    it('should handle click on file correctly from studentView', () => {
        const component = <LecturePage t={ (key) => key } { ...props } />;
        window.open = jest.fn();
        renderedComponent = shallow(component);
        const event = 'files/datei.mp4';
        renderedComponent.find(LecturePageStudentView).prop('onSelectFileClick')(event);

        expect(props.fetchFile).toHaveBeenCalledWith(event);
    });

    it('should handle click on video correctly from studentView', () => {
        const component = <LecturePage t={ (key) => key } { ...props } />;

        renderedComponent = shallow(component);
        const event = 'files/datei.mp4';
        renderedComponent.find(LecturePageStudentView).prop('onSelectVideoClick')(event);

        expect(props.fetchFile).toHaveBeenCalledWith(event);
    });

    it('should handle click on video correctly from tutorView', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;

        renderedComponent = shallow(component);
        const event = 'files/datei.mp4';
        renderedComponent.find(LecturePageTutorView).prop('onSelectVideoClick')(event);

        expect(props.fetchFile).toHaveBeenCalledWith(event);
    });

    it('should handle save of comment correctly from tutorView', () => {
        const component = <LecturePage t={ (key) => key } { ...propsNotStudent } />;
        renderedComponent = shallow(component);

        // Switch to a lecture page to be able to add a comment
        const event = {
            target: {
                id: 'lecture_01',
            },
        };
        renderedComponent.find(LecturePageTutorView).prop('handleLectureMenuClick')(event);

        const comment = 'a new comment';
        renderedComponent.find(LecturePageTutorView).prop('onCommentSubmit')(comment, propsNotStudent.currentSubject.subject_id);

        expect(propsNotStudent.saveComment).toHaveBeenCalledWith(propsNotStudent.currentSubject.subject_id, 'lecture_01', propsNotStudent.user, comment);
    });

    it('should handle save of comment correctly from studentView', () => {
        const component = <LecturePage t={ (key) => key } { ...props } />;
        renderedComponent = shallow(component);

        // Switch to a lecture page to be able to add a comment
        const event = {
            target: {
                id: 'lecture_01',
            },
        };
        renderedComponent.find(LecturePageStudentView).prop('handleLectureMenuClick')(event);

        const comment = 'a new comment';
        renderedComponent.find(LecturePageStudentView).prop('onCommentSubmit')(comment, props.currentSubject.subject_id);

        expect(props.saveComment).toHaveBeenCalledWith(props.currentSubject.subject_id, 'lecture_01', props.user, comment);
    });
});
