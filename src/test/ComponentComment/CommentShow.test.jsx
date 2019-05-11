import React from 'react';
import CommentShow from '../../main/Comment/CommentShow';
import { shallow } from 'enzyme';

describe('Component CommentAdd', () => {
    const props = {
        message: 'this is a test comment',
        user: 'theUserName',
        timestamp: 'thetime',
    };

    it('should match snapshot', () => {
        const component = shallow(<CommentShow { ...props } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
