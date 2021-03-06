import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Button, Picker } from 'native-base';
import { concatGenres, getImageObject } from '../../util/util';
import { backgroundColorBlack, colorWhite, backgroundColorRed } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';
import CoverTitle from '../components/cover-title';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        ...backgroundColorBlack,
        flexDirection: 'column'
    },
    overview: {
        ...colorWhite,
        textAlign: 'justify'
    },
    buttonAction: {
        ...backgroundColorRed,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icon: {
        paddingLeft: 5
    },
    subContainer: {
        paddingTop: 20
    },
    picker: {
        flex: 1,
        ...colorWhite,
        ...backgroundColorRed
    }
});

const SerieDetail = ({ serie, share, handleMyList, handleChangeSeason, seasonSelected, episodes, renderEpisodes }) => {
    const iconName = serie.inMyList ? "ban" : "check";

    return (
        <View style={styles.container}>
            <View>
                <CoverTitle uri={getImageObject(serie)} title={concatGenres(serie.genres, 2)} />
            </View>
            <View style={styles.buttonContainer}>
                <Button rounded iconLeft style={styles.buttonAction} onPress={() => handleMyList(serie.id)}>
                    <Icon name={iconName} color={colorWhite.color} style={styles.icon} size={18} />
                    <Text>Mi Lista</Text>
                </Button>
                <Button rounded iconLeft style={styles.buttonAction} onPress={() => share(serie.title, serie.homepage)}>
                    <Icon name='share-alt' color={colorWhite.color} style={styles.icon} size={18} />
                    <Text>Compartir</Text>
                </Button>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.overview}>{serie.overview}</Text>
            </View>

            <View style={styles.subContainer}>
                <Picker
                iosIcon={<Icon name="chevron-down" color="white" />}
                    mode="modal"
                    placeholder="Temporadas"
                    style={styles.picker}
                    selectedValue={`${seasonSelected}-${serie.id}`}
                    onValueChange={handleChangeSeason}
                >
                    <Picker.Item label="Ver temporadas" value="" />
                    {
                        serie.seasons.map((season, index) => (
                            <Picker.Item key={index} label={season.name} value={`${season.number}-${serie.id}`} />
                        ))
                    }
                </Picker>
            </View>

            {
                episodes.length !== 0 &&
                <View style={styles.subContainer}>
                    <FlatList
                        data={episodes}
                        keyExtractor={i => i.id.toString()}
                        renderItem={renderEpisodes}
                    />
                </View>
            }

        </View>
    );
}

export default SerieDetail;