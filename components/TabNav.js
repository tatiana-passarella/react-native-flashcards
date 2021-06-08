import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeckList from './DeckList'
import AddDeck from './AddDeck'

// Config for TabNav
const RouteConfigs = { 
  DecksList:{
    name: "DeckList",
    component: DeckList,
    options: {tabBarIcon: ({color}) => <MaterialCommunityIcons name="playlist-star" size={30} color={color} />, title: 'Decks'}
  },
  AddDeck:{
    name: "AddDeck",
    component: AddDeck,
    options: {tabBarIcon: ({color}) => <MaterialCommunityIcons name="playlist-plus" size={30} color={color} />, title: 'Add Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions:{
    activeTintColor: '#CC0000',
    inactiveTintColor: '#ccc',
    style:{
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#CC0000',
      paddingBottom: 10,
      paddingTop: 10,
      height: 60,
    }
  }
  };
const Tab = createBottomTabNavigator(); 

export default class TabNav extends React.Component {
    render() {
        return (
        <Tab.Navigator {...TabNavigatorConfig}>
          <Tab.Screen {...RouteConfigs['DecksList']} />
          <Tab.Screen {...RouteConfigs['AddDeck']} />  
        </Tab.Navigator>
        )
    }
}

