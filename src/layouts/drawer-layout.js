import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Header, Body, Content } from 'native-base';
import { DrawerItems, SafeAreaView } from 'react-navigation';

class DrawerLayout extends Component {

    navigateToScreen = (route) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            });
            this.props.navigation.dispatch(navigateAction);
        })

    render() {
        return (
            <ScrollView>
                <Container>
                    <Content>
                        <DrawerItems {...this.props} />
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

export default DrawerLayout;