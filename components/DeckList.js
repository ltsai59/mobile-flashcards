import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native"
import { purple } from "../utils/colors"
import IndividualDeck from './IndividualDeck'
import { Text } from 'react-native'
import Deck from './Deck'
import { isIOS } from '../utils/helpers'

class DeckList extends Component {
    state = {
        ready: false
    }

    onLayout(e) {
        const {nativeEvent: {layout: {height}}} = e;
        this.height = height;
        this.forceUpdate();
    }

    componentDidMount() {
        const {dispatch} = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({
                ready: true
            })))
    }

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        const {ready} = this.state
        const {decks, navigation} = this.props
        if (ready === false) {
            return <AppLoading/>
        }
        return (
            <ScrollView
                contentContainerStyle={[styles.container, {minHeight: this.height || heightOfDeviceScreen}]}
                onLayout={this.onLayout.bind(this)}
            >
                <Text style={styles.title}>Mobile Flash Cards</Text>
                {Object.keys(decks).map((deckId) => {
                    return (
                        <TouchableOpacity key={deckId}
                                          style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                                          onPress={() => navigation.navigate(
                                              'IndividualDeck',
                                              {title: deckId}
                                          )}
                        >
                            <Deck id={deckId}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 20,
        marginRight: 40,
        marginLeft: 40,
    },
    title: {
        fontSize: 22,
        color: purple,
        textAlign: 'center',
        marginBottom: 20
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
})


function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)
