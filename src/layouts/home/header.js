import React from 'react';
import { StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Header, Left, Text } from 'native-base';
import globalStyles from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 30
    },
    left: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    series: {
        marginLeft: 20
    },
    icon: {
        width: 50,
        height: 50
    }
});

const HomeHeader = props => {
    return (
        <Header style={[styles.container, globalStyles.container]} transparent>
            <StatusBar backgroundColor={globalStyles.statusBar.backgroundColor} barStyle="light-content" />
            <Image source={require('../../assets/movie-icon.png')} style={styles.icon} />
            <Left style={styles.left}>
                <TouchableOpacity onPress={() => { props.goToMovies() }} style={styles.series}>
                    <Text style={globalStyles.white}>Películas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.goToSeries() }} style={styles.series}>
                    <Text style={globalStyles.white}>Series</Text>
                </TouchableOpacity>
            </Left>
        </Header>
    );
}

export default HomeHeader;