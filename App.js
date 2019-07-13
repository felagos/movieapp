import React, { Component } from 'react';
import AppNavigation from './src/app-navigator';
import { Root } from 'native-base'

export default class App extends Component {

	render() {
		return (
			<Root>
				<AppNavigation />
			</Root>
		);
	}

}

