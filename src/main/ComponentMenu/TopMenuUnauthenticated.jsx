import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import './TopMenu.css';


class TopMenuUnauthenticated extends Component {

    render() {
        const { t, changeLanguage } = this.props;

        return (
            <React.Fragment>
                <Menu pointing id='top-menu'>
                    <Menu.Menu
                        id='top-menu-dropdown-language-unauthenticated'
                        position="right"
                    >
                        <Dropdown
                            id='dropdown-language'
                            button
                            className='icon'
                            floating
                            labeled
                            icon='world'
                            text={ t('menu.language') }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => changeLanguage('en') }>English</Dropdown.Item>
                                <Dropdown.Item onClick={ () => changeLanguage('de') }>German</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </React.Fragment>
        );
    }
}


export default TopMenuUnauthenticated;
