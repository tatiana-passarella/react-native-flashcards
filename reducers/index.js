import { 
  RECEIVE_DECKS, 
  ADD_NEW_DECK, 
  REMOVE_DECK, 
  ADD_NEW_CARD
 } from '../actions'

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            //console.log("STATE", state);
            //console.log("ACTION", action);
            //console.log("DECKS", action.decks);
            return {
                ...state,
                ...action.decks
            }
            
        case ADD_NEW_DECK: 
            return {
              ...state,
              [action.title]: {
                title: action.title,
                questions: [],
                answersSelected: []
              }
            }

        case REMOVE_DECK:
            var copy = {...state}
            delete copy[action.title]
            return copy

        case ADD_NEW_CARD:
            return {
              ...state,
              [action.title]: {
                ...state[action.title],
                questions: state[action.title].questions.concat(action.card)
              }
            }
                        
        default:
            return state
    }


}