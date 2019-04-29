import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../main/pages/LoadingPage';


describe('LoadingPage', () => {
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

        const component = <LoadingPage t={ (key) => key } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});
