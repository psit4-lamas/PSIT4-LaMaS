import React, { Component } from 'react';
import { withRouterAndRedux } from '../../utils';
import { loadSubject, logOut, saveSubject } from '../actions';
import { Button, Dropdown, Input, Menu, Segment } from 'semantic-ui-react';
import './TopMenu.css';


class TopMenu extends Component {
    state = { activeItem: window.location.pathname };

    handleItemClick = (e, { name }) => {
        const pathname = name === '/home' || name === '/upload' || name === '/createsubject' ? `${ name }` : `/courses/${ name }`;

        if (pathname.includes('/courses/')) {
            this.props.loadSubject(name.split('/')[0]);
        }

        this.setState({ activeItem: name });
        this.props.history.push(pathname);
    };

    handleLogout = () => {
        this.props.logOut();
    };

    handleSaveLecture = () => {
        this.props.saveSubject(this.props.currentSubject);
    };

    render() {
        const { t, changeLanguage, tabs } = this.props;
        const { isLoadingTabs, activeTabs, subjectLinks } = tabs;
        const currentPathname = window.location.pathname;
        const currentName = currentPathname
            .replace('/courses/', '')
            .split('/')[1]
            .replace('%20', ' ');

        // TODO: The activeTabs is a list of subjects defined in src/main/reducers/index.js
        //       It simulates fetching user's bookmarked subjects from backend based on logged in user.
        //       The backend feature is not implemented at the moment, thus define a mock data in reducers/index.js

        return (
            <div>
                <Menu pointing id="top-menu">
                    <Menu.Item name="/home" onClick={ this.handleItemClick }>
                        Home
                    </Menu.Item>
                    <Menu.Item name="/upload" active={ currentName === 'upload' } onClick={ this.handleItemClick }>
                        Upload
                    </Menu.Item>
                    <Menu.Item name="/createsubject" active={ currentName === 'createsubject' } onClick={ this.handleItemClick }>
                        Create Subject
                    </Menu.Item>

                    { !isLoadingTabs &&
                      subjectLinks.length &&
                      activeTabs.map((activeTab, index) => (
                          <Menu.Item
                              key={ activeTab }
                              name={ subjectLinks[index].subject_id + '/' + subjectLinks[index].name }
                              active={ currentName === activeTab }
                              onClick={ this.handleItemClick }
                          >
                              { subjectLinks[index].name }
                          </Menu.Item>
                      )) }

                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..."/>
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Menu id="top-menu-dropdown-language" position="right">
                        <Dropdown id="dropdown-language" button className="icon" floating labeled icon="world" additionPosition="bottom" text={ t('menu.language') }>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => changeLanguage('en') }>English</Dropdown.Item>
                                <Dropdown.Item onClick={ () => changeLanguage('de') }>German</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>

                    <Menu.Menu id="top-menu-logout" position="right">
                        <Menu.Item>
                            <Button color="red" onClick={ this.handleLogout }>
                                { t('menu.logout') }
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                { window.location.pathname === '/home' || window.location.pathname === '/' ? (
                    ''
                ) : (
                      <Segment>
                          <Menu.Menu id="top-menu-lecture" position="right">
                              <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="pencil" additionPosition="bottom" text={ t('menu.actions') }>
                                  <Dropdown.Menu>
                                      <Dropdown.Item onClick={ () => changeLanguage('en') }>{ t('menu.editLecture') }</Dropdown.Item>
                                      <Dropdown.Item onClick={ () => changeLanguage('de') }>{ t('menu.unpublish') }</Dropdown.Item>
                                  </Dropdown.Menu>
                              </Dropdown>
                              <Button onClick={ this.handleSaveLecture }>{ t('menu.save') }</Button>
                          </Menu.Menu>
                      </Segment>
                  ) }
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    tabs: state.tabs,
    currentSubject: state.subject.currentSubject,
} );

const mapDispatchToProps = {
    logOut,
    loadSubject,
    saveSubject,
};

export { TopMenu };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, TopMenu);
