import React from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5
    }
});

const SearchLayout = props => {
    return (
        <SafeAreaView style={[styles.container, backgroundColorBlack]}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={styles.container}>
                {props.header}
            </View>
        </SafeAreaView>
    );
}

export default SearchLayout;