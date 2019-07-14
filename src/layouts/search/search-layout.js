import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Container, Grid } from 'native-base';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    }
});

const SearchLayout = props => {
    return (
        <SafeAreaView style={[styles.container, backgroundColorBlack]}>
            <Container style={backgroundColorBlack}>
                {props.header}
                <Grid>

                </Grid>
            </Container>
        </SafeAreaView>
    );
}

export default SearchLayout;