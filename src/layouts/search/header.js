import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Header, Item, Icon, Input } from 'native-base';

const HeaderSearch = props => {
    return (
        <Header searchBar rounded>
            <Item>
                <Icon name="search" />
                <Input placeholder="Buscar" onChangeText={(text) => props.search(text)} />
                {props.iconLoading && <ActivityIndicator size="small" color="#e50914" />}
            </Item>
        </Header>
    );
}

export default HeaderSearch;