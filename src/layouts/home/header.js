import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header, Left, Text } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5
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
        <Header style={styles.container} transparent>
            <Image source={require('../../assets/movie-icon.png')} style={styles.icon} />
            <Left style={styles.left}>
                <TouchableOpacity onPress={() => { props.goToMovies() }} style={styles.series}>
                    <Text>Películas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.goToSeries() }} style={styles.series}>
                    <Text>Series</Text>
                </TouchableOpacity>
            </Left>
        </Header>
    );
}

export default HomeHeader;