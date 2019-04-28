import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import RatingComponent from '../../main/RatingComponent/RatingComponent';


describe('Rating Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<RatingComponent { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let ratingComponent;

    const props = {
        userRating: 1,
        t: (key) => key,
        currentRating: 5,
        subject_id: 'test_123',
        addRating: jest.fn(),
        userId: 'def',
    };

    const ratingDefault = Object.freeze({ target: null });
    const ratingEvent = Object.freeze({ value: 5 });

    beforeEach(() => {
        const component = <RatingComponent { ...props } />;

        ratingComponent = shallow(component);
    });

    afterEach(() => {
        ratingComponent.unmount();
    });

    it('should render correctly', () => {
        expect(ratingComponent).toMatchSnapshot();
    });

    it('shows additional vote bar to add new voting', () => {
        ratingComponent.simulate('mouseenter');

        expect(ratingComponent.state('isHovering')).toBe(true);
        expect(ratingComponent.find({ name: 'userRating' })).toHaveLength(1);
    });

    it('shows not additional vote bar after mouse leave', () => {
        ratingComponent.simulate('mouseenter');
        ratingComponent.simulate('mouseleave');

        expect(ratingComponent.state('isHovering')).toBe(false);
        expect(ratingComponent.find({ name: 'userRating' })).toHaveLength(0);
    });

    it('calls addRating on click', () => {
        ratingComponent.simulate('mouseenter');

        ratingComponent.find({ name: 'userRating' }).prop('onRate')(ratingDefault, { rating: 5 });

        expect(props.addRating).toHaveBeenCalledWith(props.subject_id, props.userId, ratingEvent.value);
    });

    it('userRating is saved in state', () => {
        ratingComponent.simulate('mouseenter');

        ratingComponent.find({ name: 'userRating' }).prop('onRate')(ratingDefault, { rating: 5 });

        expect(ratingComponent.state('userRating')).toBe(5);
    });
});
