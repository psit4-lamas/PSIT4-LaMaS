import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userRedirectedToAccessedPath } from '../actions';

const SecureGuard = (props) => {

    if (props.user.isAuthenticated) {

        // If the authenticated user triggers a page refresh, clear first the stored accessed path name.
        if (props.user.userAccessedPathname) {
            props.userRedirectedToAccessedPath();
        }

        return props.children;
    }

    return (
        <Redirect
            to={ {
                pathname: '/login',
                from: props.location,
            } }
        />
    );
};

const mapStateToProps = (state) => ( {
    user: state.user,
} );

const mapDispatchToProps = {
    userRedirectedToAccessedPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecureGuard);
