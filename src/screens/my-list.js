import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
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
        const img = !item.poster_path ? require('../assets/no_disponible.jpg') : { uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` };
        const width = Dimensions.get("window").width / 2.2;

        return (
            <View style={{ margin: 10, height: 250, width }}>
                <CachedImage source={img} style={{ height: 250, width }} />
            </View>
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