import React from 'react';
import ReactDOM from 'react-dom';
import i18n from '../../i18n';
import { create } from 'react-test-renderer';
import TopMenuUnauthenticated from '../../main/ComponentMenu/TopMenuUnauthenticated';
import { Dropdown } from 'semantic-ui-react';

describe('Top menu unauthenticated', () => {

    let div;
    let props;
    let component;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        props = {
            t: (key) => key,
            changeLanguage: (lang) => lang
        };

        component = create(<TopMenuUnauthenticated { ...props } />);
        rootInstance = component.root;
    });

    it('renders without crashing', () => {
        const intern = i18n.default;
        console.log(intern.language);
        console.log(i18n.languages);

        const menu = <TopMenuUnauthenticated { ...props } />;
        ReactDOM.render(menu, div);

        console.log(i18n.language);

        ReactDOM.unmountComponentAtNode(div);
    });

    it('should change language when clicking on Dropdown', () => {
        const dropdownItems = rootInstance.findAllByType(Dropdown.Item);

        expect(dropdownItems[0].props.children).toEqual('English');
        expect(dropdownItems[1].props.children).toEqual('German');

        expect(dropdownItems[0].props.onClick()).toEqual('en');
        expect(dropdownItems[1].props.onClick()).toEqual('de');
    });
});