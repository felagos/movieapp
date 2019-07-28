import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header, Left, Button } from 'native-base';
import { backgroundColorBlack, colorRed, colorWhite } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';

const styles = StyleSheet.create({
    containerTile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        ...colorWhite,
        fontSize: 18
    }
});

const HeaderMedia = props => {
    return (
        <Header style={backgroundColorBlack} transparent>
            <Left style={styles.containerTile}>
                <Button onPress={() => props.goBack()} transparent>
                    <Icon name='arrow-left' size={20} color={colorRed.color} />
                </Button>
                {props.title && <Text style={styles.title}>{props.title}</Text>}
            </Left>
        </Header>
    );
}

export default HeaderMedia;