import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { removeDeck as remove } from '../utils/api';
import { removeDeck } from '../actions';
import AppLoading from 'expo-app-loading'

class Deck extends Component {
  state = {
    ready: true
  }
  onDelete = async () => {
    const { dispatch, title, navigation } = this.props
    this.setState(() => ({
      ready: false
    }))
    await remove(title)
    dispatch(await removeDeck(title))
    navigation.navigate('Decks')
    //navigation.popToTop()
  };

  render() {
    const { ready } = this.state;
    if (ready === false) {
        return <AppLoading />
    }
    const { deck, title, navigation } = this.props
    const questions = deck.questions
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={{color: '#CC0000'}}>{questions.length} cards</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCard', {title:title})}
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        {questions.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quiz', {title:title})}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={this.onDelete}
        >
          <Text style={styles.removeText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
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
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    borderRadius: 20,
    borderColor:'#373737',
    backgroundColor: '#fafafa',
    width: 270,
    alignSelf: 'center'
  },
  btnText: {
    color: '#373737',
    fontSize: 16
  }, 
  removeBtn: {
    alignItems: 'center',
    //borderWidth: 1,
    //borderColor:'#8a0101',
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fafafa',
    width: 270,
    alignSelf: 'center'
      
  },
  removeText:{
    color:'#8a0101',
    fontSize: 16
  }
});

function mapStateToProps( state, { route } ) {
    const { title } = route.params
    return {
        title,
        deck: state[title]
    }
}

export default connect(mapStateToProps)(Deck)