import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { backgroundColorBlack } from '../styles/styles';
import MyListService from '../services/my-list-service';
import Loader from '../widgets/loader-widget';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...backgroundColorBlack
    }
});

class MyList extends Component {

    state = {
        myList =[],
        loading: true
    };

    async componentDidMount() {
        try {
            const myList = await MyListService.getMyList();
            this.setState({ myList, loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading, myList } = this.state;
        StatusBar.setBackgroundColor('#221f1f', true);

        if (loading)
            return <Loader loading={loading} text="Cargando película ..." />

        return (
            <SafeAreaView>

                <View style={styles.container}>

                </View>
            </SafeAreaView>
        );
    }
}

export default MyList;