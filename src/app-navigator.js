import React from 'react';
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import Search from './screens/search';
import MyList from './screens/my-list';
import Movies from './screens/movies';
import Series from './screens/series';
import IconWidget from './widgets/icon-widget';


/*const SeriesTab = createBottomTabNavigator(
    {
        MostPopular: {
            screen: SeriesMostPopular,
            navigationOptions: { title: 'Más populares' }
        },
        TopRated: {
            screen: SeriesTopRated,
            navigationOptions: { title: 'Más votadas' }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                
                if (routeName === 'MostPopular')
                    return <IconWidget name="star" color={tintColor} size={16} />

                if (routeName === 'TopRated')
                    return <IconWidget name="certificate" color={tintColor} size={16} />

            },
        })
    }
);

const DrawerRoot = createDrawerNavigator(
    {
        Movies: {
            screen: MovieScreen,
            navigationOptions: {
                title: 'Películas',
                drawerIcon: <IconWidget name="film" size={16} />
            }
        },
        Series: {
            screen: SeriesTab,
            navigationOptions: {
                title: 'Series',
                drawerIcon: <IconWidget name="tv" size={16} />
            }
        }
    }, {
        content: DrawerLayout
    }
);*/

const HomeStack = createStackNavigator(
    {
        Home,
        Movies,
        Series
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
                    return <IconWidget name="home" color={tintColor} size={16} />

                if (routeName === 'Search')
                    return <IconWidget name="search" color={tintColor} size={16} />

                if (routeName === 'MyList')
                    return <IconWidget name="check" color={tintColor} size={16} />

            },
        })
    }
);

const AppNavigation = createAppContainer(TabRoot);

export default AppNavigation;