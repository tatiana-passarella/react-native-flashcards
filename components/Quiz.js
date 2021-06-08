import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';
import Result from './Result';


class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0,
    showResult: false
  }
  
  handleCorrect = () => {
    const {questionIndex} = this.state;
    const {deck} = this.props;

    this.setState(prevState => ({
      score: prevState.score + 1,
      questionIndex: prevState.questionIndex + 1,
    }));
    this.card.flip();
    if (questionIndex + 1 === deck.questions.length) {
      return this.setState(prevState => ({
        showResult: !prevState.showResult
      }));
    }
    
  }

  handleWrong = () => {
    const {questionIndex} = this.state;
    const {deck} = this.props;
    
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
    }));
    this.card.flip();
    if (questionIndex + 1 === deck.questions.length) {
      return this.setState(prevState => ({
        showResult: !prevState.showResult
      }));
    }
  }

  backHome = () => {
    const { navigation } = this.props
    this.setState({
      questionIndex: 0,
      score: 0,
      showResult: false
    });
    navigation.navigate('Decks')
  }
  
  startAgain = () => {
    const { navigation } = this.props
    this.setState({
      questionIndex: 0,
      score: 0,
      showResult: false
    });
    navigation.navigate('Quiz');
  }

  render() {
    const { deck } = this.props;
    const { questionIndex, showResult, score } = this.state;
    
    return (

      <View style={styles.container}>
        <Text style={styles.header}>{deck.title} Quiz</Text>
        <View style={styles.qIndex}>
          { !showResult
            ? <Text style={styles.cards}>
                {questionIndex + 1} / {deck.questions.length}
              </Text>
            : <Text style={styles.cards}>
                Results
              </Text>
          }
        </View>

        { !showResult 
        ?  <>
            <View style={styles.cardContainer}>
              <CardFlip style={styles.cardContainer} ref={card => (this.card = card)} /*flipDirection={'x'}*/>
                <View>
                  <View 
                    activeOpacity={1}
                    style={[styles.card, styles.card1]}
                    >
                    <Text style={styles.questionAnswer}>{ deck.questions[questionIndex].question }</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.card.flip()}
                  >
                    <Text style={styles.btnText}>Show Answer</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    activeOpacity={1}
                    style={[styles.card, styles.card2]}
                    >
                    <Text style={styles.questionAnswer}>{ deck.questions[questionIndex].answer }</Text>
                  </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.handleCorrect}
                      >
                      <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonWrong}
                        onPress={this.handleWrong}
                        >
                      <Text style={styles.btnTextWrong}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
              </CardFlip>
            </View>
            </>
        : <Result result={score}
            questionsCount={deck.questions.length} 
            backHome={this.backHome} 
            startAgain={this.startAgain} 
          />
    }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingLeft:30,
    paddingRight:30    
  },
  header: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: 'lightsteelblue',
    textShadowRadius: 2
  }, 
  cards: {
    color: '#CC0000',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    padding: 10,
    backgroundColor:'#fafafa',
    paddingLeft: 20
  },
  qIndex: {
    borderBottomWidth: 2,
    borderBottomColor: '#CC0000',
  },
  cardContainer: {
    marginTop: 10,
    height: 300,
    width: '100%',
  },
  card: {
    height: 300,
    width: '100%',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  }, 
  card1: {
    //backgroundColor: '#FF6666',
    backgroundColor: '#fff',
  },
  card2: {
    //backgroundColor: '#CCCCFF',
    backgroundColor: '#fff',
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
  buttonWrong: {
    alignItems: 'center',
    borderWidth:1,
    padding: 10,
    marginTop: 15,
    borderRadius: 20,
    borderColor:'#8a0101',
    backgroundColor: '#fafafa',
    width: 270,
    alignSelf: 'center'    
  },
  btnText: {
    color: '#373737',
    fontSize: 16
  },
  btnTextWrong: {
    color: '#CC0000',
    fontSize: 16
  },
  questionAnswer: {
    color: '#373737',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 40,
    padding: 20,
  },
});

const mapStateToProps = (state, {route}) => {
  const { title } = route.params;
  
  return {
    deck: state[title],
  }
  
};

export default connect(mapStateToProps)(Quiz);