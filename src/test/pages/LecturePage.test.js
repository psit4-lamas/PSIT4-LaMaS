import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import './loadSubject.mock';
import { LecturePage } from '../../main/pages/LecturePage';

describe('LecturePage', () => {
    let renderedComponent;

    const props = {
        loadSubject,
        match: { path: '/courses/:subject_id/:subject', url: '/courses/2D0MoB57yByiAQhLSGnK/MQMO', isExact: true, params: { subject_id: '2D0MoB57yByiAQhLSGnK', subject: 'MQMO' } },
        location: { pathname: '/courses/2D0MoB57yByiAQhLSGnK/MQMO', search: '', hash: '' },
        history: { length: 2, action: 'POP', location: { pathname: '/courses/2D0MoB57yByiAQhLSGnK/MQMO', search: '', hash: '' } },
        user: { isAuthenticated: false, isLoadingUser: true, userAccessedPathname: '' },
        currentSubject: {
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
        },
    };

    const user = Object.freeze({
        isLoadingUser: true,
    });

    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //
    //     ReactDOM.render(<BaseLayout t={ (key) => key } user={ user } />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    beforeEach(() => {
        const component = <LecturePage t={(key) => key} {...props} />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});
