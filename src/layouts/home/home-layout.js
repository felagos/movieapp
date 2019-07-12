import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import globalStyles from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
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
        <SafeAreaView style={[styles.container, globalStyles.container]}>
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
                                <Text style={[styles.title, globalStyles.titleSection]}>Películas populares</Text>
                                {props.movieComponent}
                            </View>
                        </Col>
                    </Row>
                    <Row style={styles.magin20}>
                        <Col size={100}>
                            <View style={styles.containerRow}>
                                <Text style={[styles.title, globalStyles.titleSection]}>Series populares</Text>
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