import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { addNewDeck } from '../actions'
import { saveDeck } from '../utils/api.js'
import { CommonActions } from '@react-navigation/native'

class AddDeck extends Component {  
  state = {
    deckName: ''
  };

  onChange = (text) => {
    this.setState(() => ({
        deckName: text
    }))
  }

  onSubmit = () => {
    const { addDeck, navigation, decksTitles } = this.props;
    const { deckName } = this.state;

    if (decksTitles.includes(deckName.toLocaleLowerCase())) {
      Alert.alert(
        "You already have a deck with this name",
        "Try with another name",
        [{ text: "OK" }],
        { cancelable: false }
      );
      this.setState(() => ({ deckName: '' }));
      return;
    }
    
    addDeck(deckName);
    saveDeck(deckName)
    navigation.dispatch(CommonActions.goBack())

    this.setState(() => ({ deckName: '' }));
  };
  render() {
    const { deckName } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Give a title to the new deck"
          onChangeText={this.onChange}
          value={deckName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}
          disabled={
            deckName.trim() === ''
          } 
        >
          <Text style={styles.btnText}>Add Deck</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingLeft:30,
    paddingRight:30
  },
  input: {
    height: 40, 
    borderColor: '#CC0000', 
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    color:'#114e60',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    borderColor:'#373737',
    backgroundColor: '#fafafa',
    width: 270,
    alignSelf: 'center'
  },
  btnText: {
    color: '#373737',
    fontSize: 16
  }, 
});


const mapStateToProps = (state) => ({
  decksTitles: Object.keys(state).map(title => title.toLocaleLowerCase())  
});

const mapDispatchToProps = dispatch => ({
  addDeck: title => dispatch(addNewDeck(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);