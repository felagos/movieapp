import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import Search from './screens/search';
import MyList from './screens/my-list';
import Movies from './screens/movies';
import MovieDetail from './screens/movie-detail';
import Series from './screens/series';
import IconWidget from './widgets/icon-widget';
import globalStyles from './styles/styles';

const HomeStack = createStackNavigator(
    {
        Home,
        Movies,
        Series,
        MovieDetail
    }
);

const TabRoot = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: { title: 'Inicio' }
        },
        Search: {
            screen: Search,
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
            activeTintColor: globalStyles.tabNavigation.color,
            style: {
                backgroundColor: globalStyles.tabNavigation.backgroundColor,
            }
        }
    }
);

const AppNavigation = createAppContainer(TabRoot);

export default AppNavigation;