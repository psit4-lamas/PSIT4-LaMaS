import React, { Component } from 'react';
import { withRouterAndRedux, isEmptyObject } from '../../utils';
import { loadSubject, logOut } from '../actions';
import { Button, Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { LaMaSColours } from '../../utils/colourPalettes';
import './TopMenu.css';


class TopMenu extends Component {

    state = {
        activeItem: window.location.pathname.replace('/courses/', '')
    };

    handleItemClick = (e, { name }) => {
        const pathname = name === '/home' || name === '/createsubject' ? `${ name }` : `/courses/${ name }`;

        if (pathname.includes('/courses/')) {
            this.props.loadSubject(name.split('/')[0]);
        }

        this.setState({ activeItem: name });
        this.props.history.push(pathname);
    };

    handleLogout = () => {
        this.props.logOut();
    };

    render() {
        const { t, changeLanguage, user, isStudent, tabs } = this.props;
        const { activeTabs } = tabs;
        const currentPathname = window.location.pathname;
        let [currentSubjectID, currentName] = currentPathname.replace('/courses/', '').split('/');
        const userRole = !isEmptyObject(user) && user.roles && user.roles.length ? user.roles[0] : 'STUDENT';

        // If the global state has no activeTabs (default state of reducer),
        // then at least show an active tab for the current visited subject page
        if (activeTabs.length < 1 && !!currentName && !!currentSubjectID) {
            activeTabs.push({
                subject_name: currentName.replace('%20', ' '),
                subject_id: currentSubjectID,
            });
        }

        // TODO: The activeTabs is a list of subjects defined in src/main/reducers/index.js
        //       It simulates fetching user's bookmarked subjects from backend based on logged in user.
        //       The backend feature is not implemented at the moment, thus define a mock data in reducers/index.js

        return (
            <div>
                <Menu pointing id="top-menu">
                    <Menu.Item name="/home" onClick={ this.handleItemClick }>
                        Home
                    </Menu.Item>
                    { !isStudent && <Menu.Item name="/createsubject" active={ currentName === 'createsubject' }
                                               onClick={ this.handleItemClick }
                    >
                        Create Subject
                    </Menu.Item> }

                    { activeTabs.map(activeTab => (
                          <Menu.Item
                              key={ activeTab.subject_id }
                              name={ activeTab.subject_id + '/' + activeTab.subject_name.replace(' ', '%20') }
                              active={ currentName === activeTab.subject_name }
                              onClick={ this.handleItemClick }
                          >
                              { activeTab.subject_name }
                          </Menu.Item>
                      )) }

                    {/*<Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..."/>
                        </Menu.Item>
                    </Menu.Menu>*/}

                    <Menu.Menu position="right">
                        <Dropdown id="dropdown-language" button className="icon" floating labeled icon="world"
                                  additionPosition="bottom" text={ t('menu.language') }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => changeLanguage('en') }>English</Dropdown.Item>
                                <Dropdown.Item onClick={ () => changeLanguage('de') }>German</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>

                    <Menu.Menu id="top-menu-dropdown-language" position="right">
                        <Menu.Item>
                            <Icon circular inverted color={ LaMaSColours.dominant } name='user' />  { userRole }
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Menu id="top-menu-logout" position="right">
                        <Menu.Item>
                            <Button id='logout' color="red" onClick={ this.handleLogout }>
                                { t('menu.logout') }
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    tabs: state.tabs,
} );

const mapDispatchToProps = {
    logOut,
    loadSubject,
};

export { TopMenu };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, TopMenu);
