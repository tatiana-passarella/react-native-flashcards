import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { setNotification, clearNotification } from '../utils/api';

class Result extends Component {
  componentDidMount() {
    clearNotification().then(setNotification);
  }
  
  render() {
    const { result, questionsCount, backHome, startAgain} = this.props;
    const percent = ((result / questionsCount) * 100).toFixed(0);
    
    return (
      <>
        <View style={styles.card}>
          <Text style={styles.title}>Quiz Complete</Text>
          <Text style={styles.score}>You got { result } / { questionsCount} correct - ({ percent }%)</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={startAgain}
        >
          <Text style={styles.btnText}>Take This Quiz Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={backHome}
        >
          <Text style={styles.btnText}>Go to Decks List</Text>
        </TouchableOpacity>
      </>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 20,
    color: '#000',
    paddingLeft: 10,
    paddingRight: 10,
  },
  score:{
    color: '#CC0000',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    fontSize: 15,
    paddingBottom: 30
  },
  card: {
    height: 300,
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  button: {
    alignItems: 'center',
    borderWidth:1,
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
  }
})
 export default Result;