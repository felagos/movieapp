import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingTop: 5
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    containerRow: {
        flexDirection: 'column'
    },
    magin20: {
        marginTop: 20
    }
});

const HomeLayout = props => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Grid>
                    <Row>
                        <Col size={100}>
                            {props.upcomingComponent}
                        </Col>
                    </Row>
                    <Row style={styles.magin20}>
                        <Col size={100}>
                            <View style={styles.containerRow}>
                                <Text style={styles.title}>Películas populares</Text>
                                {props.movieComponent}
                            </View>
                        </Col>
                    </Row>
                    <Row style={styles.magin20}>
                        <Col size={100}>
                            <View style={styles.containerRow}>
                                <Text style={styles.title}>Series populares</Text>
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