import React from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { Header, Item, Icon, Input } from 'native-base';
import globalStyles from '../../styles/styles';

const HeaderSearch = props => {
    return (
        <Header searchBar rounded style={[globalStyles.backgroundColorBlack]} transparent>
            <StatusBar backgroundColor={globalStyles.statusBar.backgroundColor} barStyle="light-content" />
            <Item>
                <Icon name="search" />
                <Input placeholder="Buscar" onChangeText={(text) => props.search(text)} />
                {props.iconLoading && <ActivityIndicator size="small" color="#e50914" />}
            </Item>
        </Header>
    );
}

export default HeaderSearch;