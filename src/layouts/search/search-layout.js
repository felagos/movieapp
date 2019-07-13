import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Container, Grid } from 'native-base';
import globalStyles from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    }
});

const SearchLayout = props => {
    return (
        <SafeAreaView style={[styles.container, globalStyles.container]}>
            <Container style={[globalStyles.container]}>
                {props.header}
                <Grid>

                </Grid>
            </Container>
        </SafeAreaView>
    );
}

export default SearchLayout;