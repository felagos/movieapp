import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { backgroundColorBlack } from '../styles/styles';
import MyListService from '../services/my-list-service';
import Loader from '../widgets/loader-widget';
import { getImage, IMG_SIZE } from '../util/util';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        ...backgroundColorBlack
    }
});

class MyList extends Component {

    state = {
        myList: [],
        loading: true
    };

    async componentDidMount() {
        this.props.navigation.addListener('willFocus', async () => {
            try {
                const myList = await MyListService.getMyList();
                this.setState({ myList, loading: false });
            } catch (err) {
                this.setState({ loading: false });
            }
        });


    }

    renderElement = ({ item }) => {
        const width = Dimensions.get("window").width / 2.2;
        
        let img = require('../assets/no_disponible.jpg');
        if (item.poster_path) {
            const uri = getImage(item.poster_path, IMG_SIZE.w200);
            Image.prefetch(uri);
            img = { uri };
        }

        return (
            <TouchableOpacity onPress={() => this.handleDelete(item.id, item.mediaType)}>
                <View style={{ margin: 10, height: 250, width }}>
                    <Image source={img} style={{ height: 250, width }} />
                </View>
            </TouchableOpacity>
        );
    }

    handleDelete = async (id, mediaType) => {
        Alert.alert("Confirmar",
            "¿ Desea eliminarla de la lista ?",
            [
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        await MyListService.deleteFromMyList(id, mediaType);
                        const myList = await MyListService.getMyList();
                        this.setState({ myList });
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                }
            ]
        );

    }

    render() {
        const { loading, myList } = this.state;

        StatusBar.setBackgroundColor('#221f1f', true);

        return (
            <SafeAreaView style={styles.container}>
                <Loader loading={loading} text="Cargando mi lista ..." />
                <View style={styles.container}>
                    <FlatList
                        data={myList}
                        numColumns={2}
                        keyExtractor={i => i.id.toString() * Date.now()}
                        renderItem={this.renderElement}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default MyList;