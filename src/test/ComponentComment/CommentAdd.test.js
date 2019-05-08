import React from 'react';
import CommentAdd from '../../main/Comment/CommentAdd';
import { mount, shallow } from 'enzyme';

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
});
