import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Input, Menu, Segment } from 'semantic-ui-react';
import './TopMenu.css';


class TopMenu extends Component {

    state = { activeItem: window.location.pathname };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        const pathname = name === '/home' || name === '/upload' ? `${ name }` : `/courses/${ name }`;
        this.props.history.push(pathname);
    };

    render() {
        const { t, changeLanguage, activeTabs } = this.props;
        const currentPathname = window.location.pathname;
        const currentName = currentPathname.replace('/courses/', '').replace('%20', ' ');
        // TODO: The activeTabs is a list of subjects defined in src/main/reducers/index.js
        //       It simulates fetching user's bookmarked subjects from backend based on logged in user.
        //       The backend feature is not implemented at the moment, thus define a mock data in reducers/index.js

        return (
            <div>
                <Menu pointing id='top-menu'>
                    <Menu.Item name="/home" active={ currentName === 'home' } onClick={ this.handleItemClick }>Home</Menu.Item>
                    <Menu.Item name="/upload" active={ currentName === '/upload' } onClick={ this.handleItemClick }>Upload</Menu.Item>

                    { activeTabs.map((activeTab, index) => (
                        <Menu.Item key={ activeTab } name={ activeTab } active={ currentName === activeTab } onClick={ this.handleItemClick }>{ activeTab }</Menu.Item>
                    )) }

                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..."/>
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Menu
                        id='top-menu-dropdown-language'
                        position="right"
                    >
                        <Dropdown
                            id='dropdown-language'
                            button
                            className='icon'
                            floating
                            labeled
                            icon='world'
                            additionPosition='bottom'
                            text={ t('menu.language') }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => changeLanguage('en') }>English</Dropdown.Item>
                                <Dropdown.Item onClick={ () => changeLanguage('de') }>German</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>

                { (window.location.pathname === '/home') || (window.location.pathname === '/')
                    ? ''
                    : (
                        <Segment>
                            <p>some other sub menu (see moqups)</p>
                        </Segment>
                    )
                }
            </div>
        );
    }
}


export { TopMenu };
export default withRouter(TopMenu);
