import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Body, Text, Right } from 'native-base';
import { colorWhite} from '../../styles/styles';

const styles = StyleSheet.create({
    text: {
        ...colorWhite
    }
});

const EpisodeItem = ({ episode }) => {

    return (
        <ListItem>
            <Body>
                <Text style={styles.text}>{episode.name}</Text>
                <Text style={styles.text} note>{`Episodio ${episode.episode_number}`}</Text>
            </Body>
            <Right>
                <Text style={styles.text} note>{episode.air_date}</Text>
              </Right>
        </ListItem>
    );

}

export default EpisodeItem;