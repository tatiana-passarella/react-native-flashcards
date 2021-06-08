export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addNewDeck(title) {
    return {
        type: ADD_NEW_DECK,
        title
    }
}

export function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title
    }
}

export function addNewCard (title, card) {
    return {
        type: ADD_NEW_CARD,
        title,
        card
    }
}