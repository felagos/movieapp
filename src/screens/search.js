import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import SearchLayout from '../layouts/search/search-layout';
import HeaderSearch from '../layouts/search/header';

class Search extends Component {

    state = {
        iconLoading: false
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            search: this.search
        });
    }

    search = async text => {
        this.setState({ iconLoading: true });
        setTimeout(() => {
            this.setState({ iconLoading: false });
        }, 10000)
    }

    render() {
        const { iconLoading } = this.state;
        StatusBar.setBackgroundColor('#221f1f', true);
        return (
            <SearchLayout
                header={<HeaderSearch search={this.search} iconLoading={iconLoading} />}
            />

        );
    }
}

export default Search;