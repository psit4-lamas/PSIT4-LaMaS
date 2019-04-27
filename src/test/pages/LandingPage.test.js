import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { LandingPage } from '../../main/pages/LandingPage';

describe('LandingPage', () => {
    let renderedComponent;

    const activeTabs = Object.freeze({
        null,
    });

    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //
    //     ReactDOM.render(<BaseLayout t={ (key) => key } user={ user } />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    beforeEach(() => {

        const component = <LandingPage t={ (key) => key } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});