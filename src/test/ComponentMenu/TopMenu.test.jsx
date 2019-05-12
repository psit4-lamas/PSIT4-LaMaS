import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { TopMenu } from '../../main/ComponentMenu/TopMenu';


describe('Top menu', () => {
    let div;
    let props;
    let component;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        props = {
            t: (key) => key,
            changeLanguage: (lang) => lang,
            tabs: {
                isLoadingTabs: false,
                activeTabs: [
                    {
                        subject_name: 'IS',
                        subject_id: '01234',
                    }, {
                        subject_name: 'KI2',
                        subject_id: '12345',
                    }, {
                        subject_name: 'PSIT4',
                        subject_id: '23456',
                    },
                ],
            },
        };

        component = create(<TopMenu { ...props } />);
        rootInstance = component.root;
    });

    it('renders without crashing', () => {
        // const intern = i18n.default;
        // console.log(intern.language);
        // console.log(i18n.languages);

        const menu = <TopMenu { ...props } />;
        ReactDOM.render(menu, div);

        // console.log(i18n.language);

        ReactDOM.unmountComponentAtNode(div);
    });

    it('handleOnClick correctly', () => {
        const handleItemClick = jest.fn();
        const loadSubject = jest.fn();
        const historyMock = { push: jest.fn() };

        const component = <TopMenu { ...props } handleItemClick={ handleItemClick } history={ historyMock } loadSubject={ loadSubject } />;

        const clickTopMenu = mount(component);

        clickTopMenu.find('a.item').at(2).simulate('click');
        expect(historyMock.push).toHaveBeenCalledWith('/courses/01234/IS');

        // expect(handleItemClick).toHaveBeenCalled();
    });

    it('handleLogout correctly', () => {
        const handleLogout = jest.fn();
        const logOut = jest.fn();
        const component = <TopMenu { ...props } handleLogout={ handleLogout } logOut={ logOut }/>;
        const clickTopMenu = mount(component);

        clickTopMenu.find('button').simulate('click');

        expect(logOut).toHaveBeenCalled();
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

        expect(menuItems[0].children[0].props.children[0].props.as).toEqual("img");
        expect(menuItems[0].children[0].props.children[0].props.src).toEqual("lama_round_draft.png");
        expect(menuItems[0].children[0].props.children[0].props.ui).toEqual(true);
        expect(menuItems[0].children[0].props.children[0].props.width).toEqual(30);
        expect(menuItems[0].children[0].props.children[1]).toEqual("  Home");
        expect(menuItems[0].props.name).toEqual('/home');
        expect(menuItems[1].children[0].props.children).toEqual('Create Subject');
        expect(menuItems[1].props.name).toEqual('/createsubject');
        expect(menuItems[2].children[0].props.children).toEqual('IS');
        expect(menuItems[2].props.name).toEqual('01234/IS');
        expect(menuItems[3].children[0].props.children).toEqual('KI2');
        expect(menuItems[3].props.name).toEqual('12345/KI2');
        expect(menuItems[4].children[0].props.children).toEqual('PSIT4');
        expect(menuItems[4].props.name).toEqual('23456/PSIT4');
    });
});
