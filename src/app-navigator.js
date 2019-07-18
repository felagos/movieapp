import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import Search from './screens/search';
import MyList from './screens/my-list';
import Movies from './screens/movies';
import MovieDetail from './screens/movie-detail';
import SerieDetail from './screens/serie-detail';
import Series from './screens/series';
import IconWidget from './widgets/icon-widget';
import { tabNavigation } from './styles/styles';

const HomeStack = createStackNavigator(
    {
        Home,
        Movies,
        Series,
        MovieDetail,
        SerieDetail
    }
);

const SearchStack = createStackNavigator(
    {
        Search,
        MovieDetail,
        SerieDetail
    }
);

const TabRoot = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: { title: 'Inicio' }
        },
        Search: {
            screen: SearchStack,
            navigationOptions: { title: 'Buscar' }
        },
        MyList: {
            screen: MyList,
            navigationOptions: { title: 'Mi lista' }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;

                if (routeName === 'Home')
                    return <IconWidget name="home" color={tintColor} size={20} />

                if (routeName === 'Search')
                    return <IconWidget name="search" color={tintColor} size={20} />

                if (routeName === 'MyList')
                    return <IconWidget name="check" color={tintColor} size={20} />

            },
        }),
        tabBarOptions: {
            activeTintColor: tabNavigation.color,
            style: {
                backgroundColor: tabNavigation.backgroundColor,
            }
        }
    }
);

const AppNavigation = createAppContainer(TabRoot);

export default AppNavigation;