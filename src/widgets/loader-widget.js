import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';

const LoaderWidget = ({ loading = false, color, size, opacity = 0.4, text }) => {
    return (
        <Modal
            transparent
            animationType={'none'}
            visible={loading}
            onRequestClose={() => null}
        >
            <View
                style={[
                    styles.modalBackground,
                    { backgroundColor: `rgba(0,0,0,${opacity})` }
                ]}
            >
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} color={color} size={size} />
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicatorWrapper: {
        flexDirection: 'column',
        backgroundColor: 'white',
        height: 100,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        paddingTop: 10
    }
});

export default LoaderWidget;
