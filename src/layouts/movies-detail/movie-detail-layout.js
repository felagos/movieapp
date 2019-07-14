import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { backgroundColorBlack, colorWhite } from '../../styles/styles';

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
                <Grid>
                </Grid>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeLayout;