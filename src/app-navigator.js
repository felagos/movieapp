import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieScreen from './screens/movie-screen';
import SerieScreen from './screens/serie-screen';

const TabRoot = createBottomTabNavigator(
    {
        Movie: {
            screen: MovieScreen,
            navigationOptions: { title: 'Películas' }
        },
        Serie: {
            screen: SerieScreen,
            navigationOptions: { title: 'Series' }
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                
                if (routeName === 'Movie')
                    return <Icon name="film" color={tintColor} size={16} />

                if (routeName === 'Serie')
                    return <Icon name="tv" color={tintColor} size={16} />

            },
        })
    }
);

const AppNavigation = createAppContainer(TabRoot);

export default AppNavigation;