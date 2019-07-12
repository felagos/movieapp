import React, { Component } from 'react';
import SearchLayout from '../layouts/search/search-layout';
import HeaderSearch from '../layouts/search/header';

class Search extends Component {

    state = {
        iconLoading: false
    };

    static navigationOptions = () => {
        return {
            header: null
        }
    }

    search = async text => {

    }

    render() {
        const { iconLoading } = this.state;
        return (
            <SearchLayout>
                <HeaderSearch search={this.search} iconLoading={iconLoading} />
            </SearchLayout>
        );
    }
}

export default Search;