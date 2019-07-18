import React from 'react';
import { Content, Tab, Tabs, TabHeading, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { colorWhite, backgroundColorRed } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';
import MovieList from '../containers/movies-list';
import SerieList from '../containers/series-list';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tab: {
        flex: 1
    },
    tabHeader: {
        ...backgroundColorRed
    }
});

const SearchList = ({ movies, series }) => {

    return (
        <Content style={styles.container}>
            <Tabs>
                <Tab tabStyle={styles.tab} heading={<TabHeading style={styles.tabHeader}><Icon color={colorWhite.color} size={20} name="film" /><Text>Películas</Text></TabHeading>}>
                    <MovieList columns={2} loading={false} horizontal={false} movies={movies} />
                </Tab>
                <Tab tabStyle={styles.tab} heading={<TabHeading style={styles.tabHeader}><Icon color={colorWhite.color} size={20} name="tv" /><Text>Series</Text></TabHeading>}>
                    <SerieList columns={2} loading={false} horizontal={false} series={series} />
                </Tab>
            </Tabs>
        </Content>
    );
}

export default SearchList;