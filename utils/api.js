import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './helpers'
import { deckData } from './_DATA'

export async function getDecks() {
    try {
        const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        if (storeResults === null) {
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckData));
        }

        return storeResults === null ? deckData : JSON.parse(storeResults);
    } catch (err) {
        console.log(err)
    }
}

export async function getDeck(title) {
    try {
        const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        return JSON.parse(storeResults)[title];
    } catch (err) {
        console.log(err);
    }
}

export async function saveDeckTitle(title) {
    const titleObject = {
        [title]: {
            title: title,
            questions: []
        }
    }
    try {
        return await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(titleObject))
    } catch (err) {
        console.log(err)
    }
}

export async function addCardToDeck(title, card) {
    try {
        const deck = await getDeck(title);
        await AsyncStorage.mergeItem(
            DECK_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (err) {
        console.log(err)
    }
}

export async function removeDeckFromAS(title) {
    try {
        const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
        console.log(err)
    }
}

export async function resetDecks() {
    try {
        await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckData))
    } catch (err) {
        console.log(err);
    }
}
