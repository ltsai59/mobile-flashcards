import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK, REMOVE_ALL_DECKS  } from '../actions'

function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK :
            const { deck } = action
            return {
                ...state,
                [deck.title]: deck,
            }
        case ADD_CARD :
            const { title, card } = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions : state[title].questions.concat([card]),
                }
            }
        case REMOVE_DECK :
            const { [action.title]:value, ...remainingDecks } = state
            // The code below is for reference.
            // It also works but is commented out because the destructing method above is more simple
            // const remainingDecks = Object.keys(state).reduce((object, key) => {
            //     if (key !== action.title) {
            //         object[key] = state[key]
            //     }
            //     return object
            // }, {})
            return remainingDecks
        case REMOVE_ALL_DECKS :
            return {}
        default :
            return state
    }
}

export default entries
