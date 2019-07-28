import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Loading from '../layouts/loading/loading-layout';
import Header from '../layouts/media/header';
import { backgroundColorBlack } from '../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        ...backgroundColorBlack
    },
    webview: {
        width: 300,
        ...backgroundColorBlack
    }
});

class Video extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header goBack={navigation.goBack} title="Trailer's" />,
            mode: 'modal'
        }
    }

    renderItem = ({ item: video }) => {
        return (
            <WebView style={styles.webview}
                startInLoadingState
                allowsFullscreenVideo
                javaScriptEnabled
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                scalesPageToFit={false}
                renderLoading={() => <Loading showIcon={false} />}
                source={{ uri: `https://www.youtube.com/embed/${video}?autoplay=1&disablekb=1&modestbranding=1` }}
            />
        );
    }

    render() {
        const videos = this.props.navigation.getParam("videos");

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={videos}
                        renderItem={this.renderItem}
                        itemWidth={300}
                        sliderWidth={Dimensions.get("window").width}

                    />
                </View>
            </SafeAreaView>
        );
    }

}

export default Video;