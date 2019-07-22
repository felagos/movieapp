import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import LoadingLayout from '../layouts/loading/loading-layout';

class Loading extends Component {

    async componentDidMount() {
        const isLogged = await AuthService.isLogged();
        const screen = isLogged ? "SignIn" : "SignOut";
        this.props.navigation.navigate(screen);
    }

    render() {
        return (
            <LoadingLayout />
        );
    }

}

export default Loading;