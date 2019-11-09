import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import TextButton from './TextButton'
import { removeDeck } from "../actions"
import { removeDeckFromAS } from "../utils/api"
import Deck from "./Deck";
import { isIOS } from '../utils/helpers'

class IndividualDeck extends Component {
    handleDelete = title => {
        const { handleDeckRemoval, navigation } = this.props
        handleDeckRemoval(title)
        removeDeckFromAS(title)
        navigation.goBack()

    };
    shouldComponentUpdate(nextProps) {
        return nextProps.title !== undefined;
    }
    render() {
        const {title} = this.props

        if (title === undefined) {
            return (
                <View>
                    <Text>No information regarding this deck.</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                    <Deck id={title} titleStyle={styles.deckTitle} cardCtStyle={styles.deckCardCount}/>
                <TextButton
                    onPress={() => this.props.navigation.navigate(
                        'NewQuestion',
                        { title }
                    )}
                    style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                    buttonTextStyle={styles.buttonText}
                >
                    Add Card
                </TextButton>
                <TextButton
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        { title }
                    )}
                    style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                    buttonTextStyle={styles.buttonText}
                >
                    Start a Quiz
                </TextButton>
                <TextButton
                    onPress={() => this.handleDelete(title)}
                    style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                    buttonTextStyle={styles.buttonText}
                >
                    Delete the Deck
                </TextButton>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 30,
        marginLeft: 30,
    },
    deckTitle: {
        fontSize:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50,
        paddingLeft: 30,
        textAlign:'center',
        paddingRight: 30,
        color: 'purple'
    },
    deckCardCount: {
        fontSize:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 100,
        paddingLeft: 30,
        textAlign:'center',
        paddingRight: 30,
        color: 'purple'
    },
    iosSubmitBtn: {
        borderRadius: 7,
        backgroundColor: purple,
        padding: 10,
        height: 50,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    androidSubmitBtn: {
        borderRadius: 3,
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
})

function mapStateToProps (decks, { navigation }) {
    const { title } = navigation.state.params

    return {
        title: decks[title] === undefined
                ? undefined
                : title
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        handleDeckRemoval: (title) => {
            dispatch(removeDeck(title))}
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);
