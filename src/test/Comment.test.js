import React from 'react';
import Comment from '../main/Comment/Comment';
import { mount } from 'enzyme';


it('checks if "saveMessage" has been called', () => {
    const saveMessage = jest.fn();
    const comment = mount(<Comment saveMessage={ saveMessage }/>);

    comment.find('form').simulate('submit');
    expect(saveMessage).toHaveBeenCalled();
    comment.unmount();
});

it('should set components state value after changed input text', function() {
    const event = { target: { value: 'test' } };
    const comment = mount(<Comment/>);

    comment.find('input').simulate('change', event);
    expect(comment.state('value')).toEqual(event.target.value);
    comment.unmount();
});
