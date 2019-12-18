import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import * as Icon from '@expo/vector-icons';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import DeckDetail from '../components/DeckDetail';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';

const routeConfigs = {
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => (
                <Icon.MaterialCommunityIcons
                    name="cards"
                    size={24}
                    color={tintColor}
                />
            ),
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => (
                <Icon.Foundation name="page-add" size={24} color={tintColor} />
            ),
        },
    },
};

const tabNavigatorConfig = {
    navigationOptions: {
        header: null,
    },
    defaultNavigationOptions: {
        bounces: true,
    },
    tabBarOptions: {
        activeTintColor: '#444',
        style: {
            height: 64,
            backgroundColor: '#BBC8CA',
            shadowColor: '#C7FFED',
            shadowOpacity: 1,
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        tabStyle: {
            marginTop: 8,
            marginBottom: 4,
        },
        showIcon: true,
    },
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: Tabs,
        },
        DeckDetail: {
            screen: DeckDetail,
            navigationOptions: {
                headerTintColor: '#444',
                headerStyle: {
                    backgroundColor: '#111',
                },
                title: 'Deck Details',
            },
        },
        AddCard: {
            screen: AddCard,
            navigationOptions: {
                headerTintColor: '#444',
                headerStyle: {
                    backgroundColor: '#111',
                },
                headerTitleStyle: {
                    justifyContent: 'center',
                    textAlign: 'center',
                },
                title: 'Add Card',
            },
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                headerTintColor: '#444',
                headerStyle: {
                    backgroundColor: '#111',
                },
            },
        },
    },
    { headerLayoutPreset: 'center' },
);

export default MainNavigator;
