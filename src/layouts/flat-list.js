import React from 'react';
import { FlatList } from 'react-native';

const GeneralFlatList = props => {
    const { data, loadMoreData, keyExtractor, renderItem } = props;
    return (
        <FlatList
            data={data}
            onEndReached={loadMoreData}
            onEndThreshold={0}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    );
}

export default GeneralFlatList;