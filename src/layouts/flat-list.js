import React from 'react';
import { FlatList } from 'react-native';

const GeneralFlatList = props => {
    const { data, onEndReached, keyExtractor, renderItem, numColumns } = props;
    return (
        <FlatList
            numColumns={numColumns}
            data={data}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    );
}

export default GeneralFlatList;