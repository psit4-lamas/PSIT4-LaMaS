import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { LandingPage } from '../../main/pages/LandingPage';


describe('LandingPage', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<LandingPage { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

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
                    subject_id: '2D0MoB57yByiAQhLSGnK',
                    subject_name: 'PSIT4',
                },
                {
                    subject_id: '4phGM2c4dZxkTs5QliLQ',
                    subject_name: 'PSIT2',
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
        const component = <LandingPage { ...props }/>;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should render correctly', () => {
        expect(renderedComponent).toMatchSnapshot();
    });

    it('should render correctly with no tabs', () => {
        renderedComponent = shallow(<LandingPage { ...propsEmpty } />);

        expect(renderedComponent).toMatchSnapshot();
    });

    it('calls loadSubject on click to element', () => {
        renderedComponent.find(Link).first().simulate('click');
        expect(props.history).toHaveLength(1);

        const pathname = `/courses/2D0MoB57yByiAQhLSGnK/${ "PSIT4".replace(' ', '%20') }`;
        expect(props.history[0]).toEqual(pathname);
    });
});
