import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import EditOverviewContent from '../../main/LectureComponents/EditOverviewContent';


describe('EditOverviewContent', () => {

    let editLectureContent;

    const props = {
        t: (key) => key,
        subject_full_name: 'Projektschiene 4',
        overview: {
            topics: 'topics text',
            labs: 'labs text',
            exam: 'exam text',
        },
        onOverviewTopicsChange: jest.fn(),
        onOverviewLabsChange: jest.fn(),
        onOverviewExamChange: jest.fn(),
    };

    beforeEach(() => {
        const component = <EditOverviewContent { ...props }/>;

        editLectureContent = shallow(component);
    });

    afterEach(() => {
        editLectureContent.unmount();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<EditOverviewContent { ...props }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render correctly', () => {
        expect(editLectureContent).toMatchSnapshot();
    });

    describe('handleTopicsChange', () => {

        const overviewTopicsEvent = Object.freeze({
            target: {
                name: 'topics',
                value: 'new topics text',
            },
        });

        it('calls onOverviewTopicsChange if overview.topics is changed', () => {
            editLectureContent.find({ name: 'topics' }).simulate('change', overviewTopicsEvent);
            expect(props.onOverviewTopicsChange).toHaveBeenCalledWith(overviewTopicsEvent.target.value);
        });
    });

    describe('handleLabsChange', () => {

        const overviewLabsEvent = Object.freeze({
            target: {
                name: 'labs',
                value: 'new labs text',
            },
        });

        it('calls onOverviewLabsChange if overview.labs is changed', () => {
            editLectureContent.find({ name: 'labs' }).simulate('change', overviewLabsEvent);
            expect(props.onOverviewLabsChange).toHaveBeenCalledWith(overviewLabsEvent.target.value);
        });
    });

    describe('handleExamChange', () => {

        const overviewExamEvent = Object.freeze({
            target: {
                name: 'exam',
                value: 'new exam text',
            },
        });

        it('calls onOverviewExamChange if overview.exam is changed', () => {
            editLectureContent.find({ name: 'exam' }).simulate('change', overviewExamEvent);
            expect(props.onOverviewExamChange).toHaveBeenCalledWith(overviewExamEvent.target.value);
        });
    });
});
