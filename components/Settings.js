import React, { Component } from 'react'
import {Text, View, StyleSheet, Platform} from 'react-native'
import { gray, white, red, purple } from '../utils/colors'
import TextButton from './TextButton'
import { resetDecks, getDecks } from '../utils/api.js'
import {receiveDecks, removeAllDecks} from "../actions"
import {connect} from "react-redux"
import { isIOS } from '../utils/helpers'

export class Settings extends Component {

    handleResetDecks = () => {
        const { dispatch } = this.props
        try {
            dispatch(removeAllDecks())
            resetDecks()
                .then(() => getDecks())
                .then((decks) => dispatch(receiveDecks(decks)))
            this.props.navigation.goBack()
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Text style={styles.title}> Settings </Text>*/}
                <View style={styles.block}>
                    <View style={styles.blockContainer}>
                        <Text style={styles.row}>
                            This will reset the data back to the original dataset.
                        </Text>
                        <View style={{ height: 20 }} />
                        <TextButton
                            style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                            buttonTextStyle={styles.buttonText}
                            onPress={this.handleResetDecks}
                        >
                            Reset Data
                        </TextButton>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 10
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 16,
        color: purple
    },
    row: {
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        fontSize: 22,
        padding: 10,
        borderRadius: 7,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        fontSize: 22,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        height: 45,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    block: {
        marginBottom: 20
    },
    blockContainer: {
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    },
    blockText: {
        fontSize: 18,
        color: gray
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
});

function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Settings)
