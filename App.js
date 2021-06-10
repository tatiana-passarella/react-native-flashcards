import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import reducer from "./reducers";
import middleware from "./middleware";
import TabNav from './components/TabNav'
import { setNotification, clearNotification } from './utils/api';

const store = createStore(reducer, middleware);

const Stack = createStackNavigator()

const StackNavigatorConfig = {
  headerMode: "screen"
};

export default class App extends Component {

  componentDidMount() {
    clearNotification().then(setNotification);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <View style={{flex: 1}}>
            <Stack.Navigator {...StackNavigatorConfig}>
              <Stack.Screen name='Decks' component={TabNav}/>
              <Stack.Screen name='DeckList' component={DeckList}/>
              <Stack.Screen 
                name='Deck' 
                component={Deck}
                options={({ route }) => ({
                  title: route.params.title,
                })} />
              <Stack.Screen name='AddDeck' component={AddDeck}/>
              <Stack.Screen name='AddCard' component={AddCard}/>
              <Stack.Screen name='Quiz' component={Quiz}/>
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </Provider>
    )
  }
}