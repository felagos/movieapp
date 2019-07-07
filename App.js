import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './src/app-navigator';
import store from './src/redux/store';

export default class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<AppNavigation />
			</Provider>
		);
	}

}

