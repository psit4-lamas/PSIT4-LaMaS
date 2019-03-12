import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const SecureGuard = (props) => {

    if (props.user.isAuthenticated) {
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

export default connect(mapStateToProps, {})(SecureGuard);
