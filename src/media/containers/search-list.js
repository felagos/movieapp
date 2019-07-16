import React from 'react';
import { Content, Tab, Tabs, TabHeading, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import { backgroundColorBlack, backgroundColorRed, colorWhite, colorBlack } from '../../styles/styles';

import Icon from '../../widgets/icon-widget';

const styles = StyleSheet.create({
    container: {
        ...backgroundColorBlack
    },
    tab: {
        ...backgroundColorRed
    }
});

const SearchWrapper = ({ movies, series }) => {
    console.log(movies)
    console.log(series)
    return (
        <Content style={styles.container}>
            <Tabs>
                <Tab heading={<TabHeading><Icon color={colorWhite.color} size={20} name="film" /><Text>Películas</Text></TabHeading>}>
                </Tab>
                <Tab activeTabStyle="red" heading={<TabHeading><Icon color={colorWhite.color} size={20} name="tv" /><Text>Series</Text></TabHeading>}>
                </Tab>
            </Tabs>
        </Content>
    );
}

export default SearchWrapper;