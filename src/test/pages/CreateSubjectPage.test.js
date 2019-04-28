import React from 'react';
import { shallow } from 'enzyme';
import CreateSubjectPage from '../../main/pages/CreateSubjectPage';

describe('CreateSubjectPage', () => {
    let renderedComponent;

    // const user = Object.freeze({
    //     isLoadingUser: true,
    // });

    const props = {
        t: jest.fn(),
        user: {
            isStudent: false,
        },
    };

    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //
    //     ReactDOM.render(<BaseLayout t={ (key) => key } user={ user } />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    beforeEach(() => {

        const component = <CreateSubjectPage { ...props } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});
