import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from '../../i18n';
import {withNamespaces} from 'react-i18next';
import {Button, Dropdown, Input, Menu, Segment} from 'semantic-ui-react';
import './TopMenu.css';
//import {logOut} from '../actions'; TODO: do logout in redux
import Firebase from '../../firebase';

class TopMenu extends Component {

    state = {activeItem: 'home'};

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        this.props.history.push(name);
    };

    handleLogout =  () => {

        Firebase.auth().signOut(); //TODO: move to redux
    };




    render() {
        const {activeItem} = this.state;
        const {t} = this.props;
        // TODO: The activeTabs is a list of subjects defined in src/main/reducers/index.js
        //       It simulates fetching user's bookmarked subjects from backend based on logged in user.
        //       The backend feature is not implemented at the moment, thus define a mock data in reducers/index.js
        const {activeTabs} = this.props.tabs;

        return (
            <div>
                <Menu pointing>
                    <Menu.Item name="home" active={ activeItem === 'home' } onClick={ this.handleItemClick }/>
                    <Menu.Item name="lectures" active={ activeItem === 'lectures' } onClick={ this.handleItemClick }/>

                    { activeTabs.map((activeTab, index) => (
                        <Menu.Item key={ activeTab } name={ activeTab } active={ activeItem === activeTab } onClick={ this.handleItemClick }/>
                    )) }

                    <Menu.Menu position="right">
                        <Dropdown item text={ t('menu.language') }>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => this.changeLanguage('en') }>English</Dropdown.Item>
                                <Dropdown.Item onClick={ () => this.changeLanguage('de') }>German</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>

                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..."/>
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button color="red" onClick = { this.handleLogout } >
                                Logout
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment>
                    <p>some other sub menu (see moqups)</p>
                </Segment>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    tabs: state.tabs,
} );

const mapDispatchToProps = {

    // TODO: do logout in redux
};

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withRouter(TopMenu)));
