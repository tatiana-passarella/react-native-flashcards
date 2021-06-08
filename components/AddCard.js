import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { addNewCard } from '../actions'
import { addNewCardToDeck } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onChangeQuestion = (text) => {
        this.setState(() => ({
            question: text
        }))
    }

    onChangeAnswer = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }
    onSubmit = () => {
        const { addNewCard, navigation, route } = this.props;
        const { title } = route.params;
        const { question, answer } = this.state;
        addNewCard(title, {question: question, answer: answer});
        addNewCardToDeck(title, {question: question, answer: answer})
        navigation.goBack({title: title });
        this.setState(() => ({ question: '', answer: '' }));
    }

  
    render() {
        const { question, answer } = this.state
        const { navigation, route } = this.props
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    onChangeText={this.onChangeQuestion}
                    placeholder='Please input the new question'
                    value={question}
                />
                <TextInput
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    onChangeText={this.onChangeAnswer}
                    placeholder='Please input the new answer'
                    value={answer}
                />
                <TouchableOpacity
                    style={styles.button}
                    disabled={question === '' || answer === ''} 
                    onPress={this.onSubmit}
                    >
                    <Text>Add Card</Text>
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
});

const mapDispatchToProps = dispatch => ({
  addNewCard: (title, card) => dispatch(addNewCard(title, card))
});

export default connect(null, mapDispatchToProps)(AddCard);