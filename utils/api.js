import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const DECK_KEY = 'MobileFlashcards:decks';

export async function getDecks() {
    const storeResults = await AsyncStorage.getItem(DECK_KEY);

    if (storeResults === null) {
        AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
}

export async function getDeck(id) {
    const storeResults = await AsyncStorage.getItem(DECK_KEY);

    return JSON.parse(storeResults)[id];
}

export async function saveDeckTitle(title) {
    await AsyncStorage.mergeItem(
        DECK_KEY,
        JSON.stringify({
            [title]: {
                title,
                questions: [],
            },
        }),
    );
}

export async function addCardToDeck(title, card) {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
        DECK_KEY,
        JSON.stringify({
            [title]: {
                questions: [...deck.questions].concat(card),
            },
        }),
    );
}

export async function removeDeck(key) {
    const results = await AsyncStorage.getItem(DECK_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECK_KEY, JSON.stringify(data));
}

export async function resetDecks() {
    await AsyncStorage.removeItem(DECK_KEY);
}
