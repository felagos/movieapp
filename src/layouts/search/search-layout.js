import React from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { Container } from 'native-base';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        ...backgroundColorBlack
    }
});

const SearchLayout = props => {
    return (
        <SafeAreaView style={styles.container}>
            <Container style={styles.container}>
                {props.children}
            </Container>
        </SafeAreaView>
    );
}

export default SearchLayout;