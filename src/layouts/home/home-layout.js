import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { backgroundColorBlack, colorWhite } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    containerRow: {
        flexDirection: 'column',
        paddingTop: 10
    },
    magin20: {
        marginTop: 20
    }
});

const HomeLayout = props => {
    return (
        <SafeAreaView style={[styles.container, backgroundColorBlack]}>
            <ScrollView>
                <View style={styles.container}>
                    {props.upcomingComponent}

                    <View style={styles.containerRow}>
                        <Text style={[styles.title, colorWhite]}>Películas populares</Text>
                        {props.movieComponent}
                    </View>

                    <View style={styles.containerRow}>
                        <Text style={[styles.title, colorWhite]}>Series populares</Text>
                        {props.serieComponent}
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeLayout;