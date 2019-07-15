import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2
    },
});

const HomeLayout = props => {
    return (
        <SafeAreaView style={[styles.container, backgroundColorBlack]}>
            <ScrollView>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeLayout;