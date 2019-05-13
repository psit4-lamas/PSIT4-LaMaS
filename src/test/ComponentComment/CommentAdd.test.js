import React from 'react';
import { shallow } from 'enzyme';
import CommentAdd from '../../main/Comment/CommentAdd';
import { Form } from 'semantic-ui-react';

describe('Component CommentAdd', () => {
    const props = {
        onCommentSubmit: jest.fn(),
        subject_id: '1a2b3c4d5e',
        t: (key) => key,
    };

    it('should match snapshot', () => {
        const component = shallow(<CommentAdd { ...props } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should call onCommentSubmit on button click', () => {
        const component = shallow(<CommentAdd { ...props } />);
        const comment = 'new comment for that lecture';
        const event = {
            target: { name: 'comment', value: comment },
        };

        component.find({ name: 'comment' }).simulate('change', event);
        component.find(Form).simulate('submit');

        expect(props.onCommentSubmit).toHaveBeenCalledWith(comment, props.subject_id);

        component.unmount();
    });
});
