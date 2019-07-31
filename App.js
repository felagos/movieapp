import React, { Component } from 'react';
import AppNavigation from './src/app-navigator';
import { Root } from 'native-base';
import NetInfo from "@react-native-community/netinfo";
import * as Toast from './src/util/toast';

export default class App extends Component {

	componentDidMount() {
		const unsubscribe = NetInfo.addEventListener(state => {
			if(!state.isConnected) {
				Toast.dangerToast("Se ha desconectado de internet");
			}
		});
	}

	render() {
		return (
			<Root>
				<AppNavigation />
			</Root>
		);
	}

}

