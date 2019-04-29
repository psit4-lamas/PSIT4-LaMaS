import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { LandingPage } from '../../main/pages/LandingPage';


describe('LandingPage', () => {

    let renderedComponent;

    const props = {
        t: (key) => key,
        loadSubjectHead: jest.fn(),
        loadSubject: jest.fn(),
        history: [],
        tabs: {
            isLoadingTabs: false,
            activeTabs: [
                {
                    subject_name: 'PSIT4',
                    subject_id: '2D0MoB57yByiAQhLSGnK',
                },
                {
                    subject_name: 'MANIT1',
                    subject_id: '4phGM2c4dZxkTs5QliLQ',
                },
            ],
        },
    };

    const propsEmpty = {
        t: (key) => key,
        loadSubjectHead: jest.fn(),
        loadSubject: jest.fn(),
        history: [],
        tabs: {
            activeTabs: [ ],
        },
    };

    beforeEach(() => {
        const component = <LandingPage { ...props } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<LandingPage { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });

    it('should render correctly with no tabs', () => {
        renderedComponent = shallow(<LandingPage { ...propsEmpty } />);

        expect(renderedComponent).toMatchSnapshot();
    });

    it('calls loadSubject on Link click', () => {
        const subject_name = props.tabs.activeTabs[0].subject_name;
        const subject_id = props.tabs.activeTabs[0].subject_id;
        renderedComponent.find(Link).first().simulate('click');
        expect(props.history).toHaveLength(1);

        const pathname = `/courses/${ subject_id }/${ subject_name }`;
        expect(props.history[0]).toEqual(pathname);
    });

    it('calls loadSubject on Link click, with "subject name with space"', () => {
        const subject_name = 'subject name with space';
        const subject_id = 'I5yzupNuhnA9j8vIGVRJ';
        const propsSubjectNameWithSpace = Object.assign({}, propsEmpty);
        propsSubjectNameWithSpace.tabs = {
            isLoadingTabs: false,
            activeTabs: [
                {
                    subject_name: subject_name,
                    subject_id: subject_id,
                },
            ],
        };

        renderedComponent = shallow(<LandingPage { ...propsSubjectNameWithSpace } />);
        renderedComponent.find(Link).first().simulate('click');
        expect(propsSubjectNameWithSpace.history).toHaveLength(1);

        const pathname = `/courses/${ subject_id }/${ subject_name.replace(/\s/g, '%20') }`;
        expect(propsSubjectNameWithSpace.history[0]).toEqual(pathname);
    });
});
