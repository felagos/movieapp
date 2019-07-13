import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Header, Left, Button, Title } from 'native-base';
import Icon from '../../widgets/icon-widget';
import { backgroundColorBlack, colorRed } from '../../styles/styles';

const styles = StyleSheet.create({
    containerTile: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        marginLeft: 5
    }
});

const HeaderMovieDetail = props => {
    return (
        <Header style={backgroundColorBlack} transparent>
            <StatusBar backgroundColor={backgroundColorBlack.backgroundColor} barStyle="light-content" />
            <Left style={styles.containerTile}>
                <Button onPress={() => props.goBack()} transparent>
                    <Icon name='arrow-left' size={20} color={colorRed.color} />
                </Button>
                <Title style={styles.title}>{props.title}</Title>
            </Left>
        </Header>
    );
}

export default HeaderMovieDetail;