import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    titleSection: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22
    }
});

const HomeLayout = props => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Grid>
                    <Row>
                        <Col size={100}>
                            <View style={styles.containerRow}>
                                <Text style={styles.titleSection}>Películas populares</Text>
                                {props.movieComponent}
                            </View>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col size={100}>
                            <View style={styles.containerRow}>
                                <Text style={styles.titleSection}>Series populares</Text>
                                {props.serieComponent}
                            </View>
                        </Col>
                    </Row>
                </Grid>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeLayout;