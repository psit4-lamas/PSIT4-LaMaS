import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { CreateSubjectPage } from '../../main/pages/CreateSubjectPage';

describe('CreateSubjectPage', () => {
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

        const component = <CreateSubjectPage t={ (key) => key } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});