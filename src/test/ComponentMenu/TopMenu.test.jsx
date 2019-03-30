import React from 'react';
import ReactDOM from 'react-dom';
import i18n from '../../i18n';
import { create } from 'react-test-renderer';
import { Dropdown, Menu } from 'semantic-ui-react';
import { TopMenu } from '../../main/ComponentMenu/TopMenu';

describe('Top menu', () => {
    let div;
    let props;
    let component;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        props = { t: (key) => key, activeTabs: [ 'IS', 'KI2', 'PSIT4' ], changeLanguage: (lang) => lang };
        component = create(<TopMenu { ...props } />);
        rootInstance = component.root;
    });

    it('renders without crashing', () => {
        const intern = i18n.default;
        console.log(intern.language);
        console.log(i18n.languages);

        const menu = <TopMenu { ...props } />;
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

    it('should render Menu items Home, Upload and all active tabs', () => {
        const menuItems = rootInstance.findAllByType(Menu.Item);

        expect(menuItems[0].children[0].props.children).toEqual('Home');
        expect(menuItems[1].children[0].props.children).toEqual('Upload');
        expect(menuItems[2].children[0].props.children).toEqual('Create Subject');
        expect(menuItems[3].children[0].props.children).toEqual('IS');
        expect(menuItems[4].children[0].props.children).toEqual('KI2');
        expect(menuItems[5].children[0].props.children).toEqual('PSIT4');
    });
});
