import {
    FETCH_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD,
    RESET_STORE,
} from './../actions/types';

import { decks as INIT_DATA } from '../utils/_DATA';

export default function decks(state = {}, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            const { title } = action;
            return {
                ...state,
                [title]: {
                    title,
                    questions: [],
                },
            };
        case REMOVE_DECK:
            const { id } = action;
            const { [id]: value, ...remainingDecks } = state;
            return remainingDecks;
        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(card),
                },
            };
        default:
            return state;
    }
}
