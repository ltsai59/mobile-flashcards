import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { formatDeckOverview } from "../utils/helpers"

const Deck = props => {
    const { deck, titleStyle, cardCtStyle } = props

    if (deck === undefined) {
        return <View style={styles.deckContainer} />;
    }

    const { title, cardCount } =  formatDeckOverview(deck)
    return (
        <View style={styles.deckContainer}>
            <View>
                <Text style={[styles.deckText, titleStyle]}>{title}</Text>
            </View>
            <View>
                <Text style={[styles.cardText, cardCtStyle]}>{cardCount} cards</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckText: {
        color: white,
        fontSize: 20
    },
    cardText: {
        color: white,
        fontSize: 15
    }
})

const mapStateToProps = (decks, { id, titleStyle, cardCtStyle }) => {
    const deck = decks[id]

    return {
        deck,
        titleStyle,
        cardCtStyle
    }
}

export default connect(mapStateToProps)(Deck)
