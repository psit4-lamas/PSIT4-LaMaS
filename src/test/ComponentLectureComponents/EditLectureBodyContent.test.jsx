import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import EditLectureBodyContent from '../../main/LectureComponents/EditLectureBodyContent';


describe('Edit LectureBodyContent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<EditLectureBodyContent t={ (key) => key } { ...props } setNewLectureTitle={ setNewLectureTitle } onLectureTitleChange={ onLectureTitleChange }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let editLectureContent;
    let setNewLectureTitle;
    let onLectureTitleChange;
    const lecture_01 = {
        is_public: false,
        name: 'Lecture 1',
        videos: {
            videos_01: {
                nameOnStorage: 'files/fdd95078-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell.css',
            },
            videos_02: {
                nameOnStorage: 'files/fdd95078-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell2.css',
            },
        },
        lecture_materials: {
            lecture_materials_01: {
                nameOnStorage: 'files/fdd95222-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell33.css',
            },
            lecture_materials_02: {
                nameOnStorage: 'files/fdd95111-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell233.css',
            },
        },
        exercises: {
            exercises_01: {
                nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                name: 'modell3333.css',
            },
            exercises_02: {
                nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                name: 'modell23322.css',
            },
        },
        comments: {},
    };
    const props = {
        lectureTitle: 'Lecture 1',
        lecture: lecture_01,
        lectureName: ' - some title',
        isValid: true,
        lectureId: 'lecture_01',
        t: (key) => key,
    };

    const lectureEvent = Object.freeze({
        target: {
            name: 'lectureTitle',
            value: 'lecture Name',
        },
    });

    const lectureTitleEmptyEvent = Object.freeze({
        target: {
            name: 'lectureTitle',
            value: '',
        },
    });

    beforeEach(() => {
        setNewLectureTitle = jest.fn();
        onLectureTitleChange = jest.fn();

        const component = <EditLectureBodyContent { ...props } onLectureTitleChange={ onLectureTitleChange }/>;

        editLectureContent = shallow(component);
    });

    afterEach(() => {
        editLectureContent.unmount();
    });

    it('should render correctly', () => {
        expect(editLectureContent).toMatchSnapshot();
    });

    it('sets subject state value if title of lecture is changed', () => {
        editLectureContent.find({name: 'lectureTitle'}).prop('onChange')(lectureEvent);
        expect(onLectureTitleChange).toHaveBeenCalledWith(lectureEvent.target.value);
    });

    it('calls save lecture if title of lecture is changed', () => {
        editLectureContent.find({ name: 'lectureTitle' }).simulate('change', lectureEvent);
        expect(onLectureTitleChange).toHaveBeenCalledWith(lectureEvent.target.value);
        // expect(editLectureContent.state('lectureTitle')).toEqual(lectureEvent.target.value);
    });

    it('shows negative message if lecture name is empty', () => {
        // editLectureContent = shallow(<EditLectureBodyContent {...props } setNewLectureTitle={ setNewLectureTitle } />);
        const component = <EditLectureBodyContent t={ (key) => key } { ...props } onLectureTitleChange={ setNewLectureTitle }/>;

        editLectureContent = shallow(component);
        editLectureContent.find({ name: 'lectureTitle' }).simulate('change', lectureTitleEmptyEvent);
        expect(editLectureContent.find('.ui.negative.message')).toBeTruthy();
    });

    it('shows not negative message if lecture name is not empty', () => {
        editLectureContent.find({ name: 'lectureTitle' }).prop('onChange')(lectureEvent);
        expect(editLectureContent.find('.ui.negative.message').get(0)).toBeFalsy();
    });
});
