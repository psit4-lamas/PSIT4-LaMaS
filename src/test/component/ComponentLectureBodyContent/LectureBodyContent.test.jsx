import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LectureBodyContent } from '../../../main/LectureComponents/LectureBodyContent';

describe('LectureBodyContent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<LectureBodyContent { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let lectureContent;
    const lecture = {
        is_public: true,
        name: 'Lecture 1',
        videos: {
            videos_00: {
                nameOnStorage: 'files/fdd95078-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell.css',
            },
            videos_01: {
                nameOnStorage: 'files/fdd95078-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell2.css',
            },
        },
        lecture_materials: {
            lecture_materials_00: {
                nameOnStorage: 'files/fdd95222-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell33.css',
            },
            lecture_materials_01: {
                nameOnStorage: 'files/fdd95111-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell233.css',
            },
        },
        exercises: {
            exercises_00: {
                nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell3333.css',
            },
            exercises_01: {
                nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell23322.css',
            },
        },
        comments: {},
    };

    const subject = {
        assigned_tutors: ['Patrick Baumgartner'],
        averageRating: 3,
        grades: {},
        lectures: {
            lecture_01: lecture,
            lecture_02: lecture,
            lecture_03: lecture,
            lecture_04: lecture,
        },
        subject_id: '2D0MoB57yByiAQhLSGnK',
        subject_name: 'MQMO',
        subject_rates: {
            tdPkwA4XH7aa4KSipjg07lRgEdg1: 1,
            undefined: 5,
        },
    };

    const props = {
        lectureTitle: 'Lecture 1',
        lecture: lecture,
        subject: subject,
        videoUrl: '',
        nameOnStorage: '',
        onSelectVideoClick: jest.fn(),
        onSelectFileClick: jest.fn(),
        t: (key) => key,
    };

    const lectureEmptyFiles = {
        is_public: true,
        name: '',
        videos: {},
        lecture_materials: {},
        exercises: {},
        comments: {},
    };
    const propsEmptyFiles = {
        lectureTitle: 'Lecture 1',
        lecture: lectureEmptyFiles,
        subject: subject,
        videoUrl: 'http://example.com',
        nameOnStorage: 'files/emptyAbc',
        onSelectVideoClick: jest.fn(),
        onSelectFileClick: jest.fn(),
        t: (key) => key,
    };


    beforeEach(() => {
        const component = <LectureBodyContent { ...props } />;

        lectureContent = shallow(component);
    });

    afterEach(() => {
        lectureContent.unmount();
    });

    it('should render correctly', () => {
        expect(lectureContent).toMatchSnapshot();
    });

    it('should render correctly with zero files', () => {
        const component = <LectureBodyContent { ...propsEmptyFiles } />;

        lectureContent = shallow(component);
        expect(lectureContent).toMatchSnapshot();
    });
});
