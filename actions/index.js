import { getDecks } from '../utils/api';

import {
    FETCH_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD,
    RESET_STORE,
} from './types';

export function receiveDecks(decks) {
    return {
        type: FETCH_DECKS,
        decks,
    };
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title,
    };
}

export function removeDeck(id) {
    return {
        type: REMOVE_DECK,
        id,
    };
}

export function addCardToDeck(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    };
}

export function handleInitData() {
    return (dispatch) => {
        return getDecks().then((decks) => {
            dispatch(receiveDecks(decks));
        });
    };
}
