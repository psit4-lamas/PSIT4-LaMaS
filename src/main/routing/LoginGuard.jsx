import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const LoginGuard = (props) => {

    if (!props.user.isAuthenticated) {
        return props.children;
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

export default connect(mapStateToProps, {})(LoginGuard);
