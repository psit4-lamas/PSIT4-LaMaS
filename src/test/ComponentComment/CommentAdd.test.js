import React from 'react';
import CommentAdd from '../../main/Comment/CommentAdd';
import { shallow } from 'enzyme';

describe('Component CommentAdd', () => {
    const props = {
        saveMessage: jest.fn(),
        t: (key) => key,
    };

    it('should match snapshot', () => {
        const component = shallow(<CommentAdd { ...props } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should call saveMessage on button click', () => {
        const component = shallow(<CommentAdd { ...props } />);
        const comment = 'new comment for that lecture';
        const event = {
            target: { value: comment },
        };

        component.find({ name: 'comment' }).prop('onChange')(event);
        component.find({ name: 'save' }).simulate('click');

        expect(props.saveMessage).toHaveBeenCalledWith(comment);

        component.unmount();
    });
});
