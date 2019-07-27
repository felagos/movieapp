import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { backgroundColorBlack } from '../styles/styles';
import MyListService from '../services/my-list-service';
import Loader from '../widgets/loader-widget';
import { MEDIA_TYPE } from '../util/constants';
import CoverMyList from '../media/components/cover-my-list';

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

    seeDetail = (id, title, media) => {
        if (media === MEDIA_TYPE.MOVIE) {
            this.props.navigation.navigate("MovieDetail", { id, title });
        }
        else {
            this.props.navigation.navigate("SerieDetail", { id, title });
        }
    }

    renderElement = ({ item }) => {
        return <CoverMyList item={item} handleDelete={this.handleDelete} seeDetail={this.seeDetail} />
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