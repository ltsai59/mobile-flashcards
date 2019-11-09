import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import NewDeck from '../components/NewDeck'
import DeckList from '../components/DeckList'
import Settings from '../components/Settings'
import { purple, white } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { isIOS } from '../utils/helpers'

const router = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) =>
                <Ionicons name={isIOS ? 'ios-bookmarks' : 'md-bookmarks'} size={30} color={tintColor} />,
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="plus-square" size={30} color={tintColor} />,
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="cogs" size={30} color={tintColor} />,
        },
    },
};

const navigationOptions = {
    tabBarOptions: {
        showIcon: true,
        activeTintColor: isIOS ? purple : white,
        style: {
            padding: 10,
            height: isIOS ? 60 : 'auto',
            fontSize: 18,
            backgroundColor: isIOS ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        },
    },
};

const TabNav =
    isIOS
        ? createBottomTabNavigator(router, navigationOptions)
        : createMaterialTopTabNavigator(router, navigationOptions)

export default createAppContainer(TabNav);
