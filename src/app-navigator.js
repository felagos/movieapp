import React from 'react';
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import MovieScreen from './screens/movie-screen';
import DrawerLayout from './layouts/drawer-layout';
import SeriesMostPopular from './screens/series/series-most-popular';
import SeriesTopRated from './screens/series/series-top-rated';
import IconWidget from './widgets/icon-widget';


const SeriesTab = createBottomTabNavigator(
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
);

const AppNavigation = createAppContainer(DrawerRoot);

export default AppNavigation;