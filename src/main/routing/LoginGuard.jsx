import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userRedirectedToAccessedPath } from '../actions';

const LoginGuard = (props) => {

    if (!props.user.isAuthenticated) {
        return props.children;
    }

    // Now the user just finished the login process. If the user wanted to access a bookmarked link,
    // redirect to the path she/he requested before being redirected to the login page.
    const { userAccessedPathname } = props.user;
    if (userAccessedPathname) {
        props.userRedirectedToAccessedPath();
        return <Redirect to={ userAccessedPathname } />;
    }

    return (
        <Redirect
            to={ {
                pathname: '/',
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginGuard);
