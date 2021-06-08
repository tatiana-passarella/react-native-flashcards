import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import AppLoading from 'expo-app-loading'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import decks from '../reducers'
import { receiveDecks } from '../actions'

import Constants from 'expo-constants';


class DeckList extends Component {
    componentDidMount() {
       const { dispatch, navigation } = this.props
       getDecks().then((decks) => {
        dispatch(receiveDecks(decks))
       })
    }

    render(){
        const decks = this.props.state
        const { dispatch } = this.props
        
        if (decks === null){
            return (
                <AppLoading />
                )
        }
        //console.log("Current titles: ", Object.keys(decks))
        return(
            <ScrollView contentContainerStyle={styles.container}>
                {Object.keys(decks).length === 0
                ? <View style={styles.container}>
                    <Text>You have no decks</Text>
                  </View>
                : <View style={styles.container}>
                 {Object.keys(decks).map((title) => {
                     return(
                      decks[title].questions
                      ?<View key={title}>
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate('Deck', {title: title})}
                            style={styles.deck}>
                            <Text style={styles.deckTitle}>{title}</Text>
                            <Text style={{color: '#CC0000'}}>{decks[title].questions.length} card</Text>
                        </TouchableOpacity>
                      </View>
                      : null
                     )
                })}
                </View>}
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'top',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1'
    },
    deck: {
      width: 290,
      height: 100,
      borderWidth: 2,
      borderColor: '#CC0000',
      borderRadius: 5,
      backgroundColor: '#fafafa',
      margin: 10,
      padding: 10,
      textAlign: 'center',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    deckTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textShadowOffset: {width: 1, height: 1},
        textShadowColor: 'lightsteelblue',
        textShadowRadius: 2
    }
})

function mapStateToProps( state ) {
    return {
        state
    }
}

export default connect(mapStateToProps)(DeckList)