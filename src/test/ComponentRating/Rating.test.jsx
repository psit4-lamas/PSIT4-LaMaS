import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import RatingComponent from '../../main/RatingComponent/RatingComponent';
import { Form } from 'semantic-ui-react';


describe('Rating Component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<RatingComponent { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let uploadMediaPageComponent;

    const props = {
        userRating: 1,
        t: (key) => key,
        currentRating: 5,
        subject_id: 'test_123',
        addRating: jest.fn(),
    };

    beforeEach(() => {
        const component = <RatingComponent { ...props } />;

        uploadMediaPageComponent = shallow(component);
    });

    afterEach(() => {
        uploadMediaPageComponent.unmount();
    });

    it('should render correctly', () => {
        expect(uploadMediaPageComponent).toMatchSnapshot();
    });
});
