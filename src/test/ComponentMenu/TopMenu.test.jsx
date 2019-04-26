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
        props = {
            t: (key) => key,
            changeLanguage: (lang) => lang,
            tabs: {
                isLoadingTabs: false,
                activeTabs: [ 'IS', 'KI2', 'PSIT4' ],
                subjectLinks: [
                    {
                        name: 'IS',
                        subject_id: '01234',
                    }, {
                        name: 'KI2',
                        subject_id: '12345',
                    }, {
                        name: 'PSIT4',
                        subject_id: '23456',
                    },
                ],
            },
        };


        component = create(<TopMenu { ...props } />);
        rootInstance = component.root;
    });

    it('renders without crashing', () => {
        const intern = i18n.default;

        const menu = <TopMenu { ...props } />;
        ReactDOM.render(menu, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    // it('handleOnClick correctly', () => {
    //     let TopMenu, TestUtils, FluxxorTestUtils, FluxConstructor, realFlux, fakeFlux;
    //
    //     TestUtils = require('react-dom/test-utils');
    //     FluxxorTestUtils = require('fluxxor-test-utils');
    //     FluxConstructor = require('../../../app/FluxConstructor.js');
    //     realFlux = FluxConstructor();
    //     fakeFlux = FluxxorTestUtils.fakeFlux(realFlux);
    //     fakeFlux.genMocksForStoresAndActions();
    //     // now all stores and action methods are mocked for testing
    //
    //     TopMenu = TestUtils.renderIntoDocument(<TopMenu flux={fakeFlux} />);
    //
    //     TopMenu.handleItemClick = jest.genMockFunction();
    //     TestUtils.Simulate.click(TopMenu.refs.MenuItem.getDOMNode());
    //     expect(TopMenu.handleItemClick).toBeCalled();
    // })

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
