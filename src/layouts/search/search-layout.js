import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Container } from 'native-base';
import globalStyles from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const SearchLayout = props => {
    return (
        <SafeAreaView style={[styles.container, globalStyles.container]}>
            <Container>
                {props.children}
            </Container>
        </SafeAreaView>
    );
}

export default SearchLayout;