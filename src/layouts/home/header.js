import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Left, Text } from 'native-base';

const styles = StyleSheet.create({
    left: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    series: {
        marginLeft: 50
    }
});

const HomeHeader = props => {
    return (
        <Header transparent>
            <Left style={styles.left}>
                <TouchableOpacity onPress={() => { props.goToMovies() }}>
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