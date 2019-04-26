import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import BaseLayout from '../../main/pages/BaseLayout';

describe('BaseLayout', () => {
    const user = Object.freeze({
        isLoadingUser: true,
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<BaseLayout t={ (key) => key } user={ user } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let renderedComponent;

    beforeEach(() => {

        const component = <BaseLayout t={ (key) => key } user={ user }/>;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should render correctly', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});