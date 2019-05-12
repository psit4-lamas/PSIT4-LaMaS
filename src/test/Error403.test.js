import React from 'react';
import { shallow } from 'enzyme';
import Error403 from '../main/Error403';


it('Error403 renders without crashing', () => {
    const location = {
        pathname: '/createsubject',
        pageName: 'Create Subject',
    };

    const component = shallow(<Error403 location={ location }/>);

    expect(component).toMatchSnapshot();

    component.unmount();
});
