import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { LecturePage } from '../../main/pages/LecturePage';

describe('LecturePage', () => {
    let renderedComponent;

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

        const component = <LecturePage t={ (key) => key } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});