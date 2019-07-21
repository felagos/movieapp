import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Button, Title } from 'native-base';
import { backgroundColorBlack, colorRed } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';

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

const HeaderRegister = props => {
    return (
        <Header style={backgroundColorBlack} transparent>
            <Left style={styles.containerTile}>
                <Button onPress={() => props.goBack()} transparent>
                    <Icon name='arrow-left' size={20} color={colorRed.color} />
                </Button>
                <Title style={styles.title}>{props.title}</Title>
            </Left>
        </Header>
    );
}

export default HeaderRegister;