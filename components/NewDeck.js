import React, { Component } from "react"
import { connect } from 'react-redux'
import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    View, Dimensions,
} from "react-native"
import { white } from '../utils/colors'
import { addDeck } from '../actions'
import { NavigationActions, NavigationEvents } from 'react-navigation'
import { Header } from 'react-navigation-stack'
import { saveDeckTitle } from '../utils/api'
import { SubmitBtn } from './SubmitBtn'

class NewDeck extends Component {
    state = {
        title: '',
    }

    onLayout(e) {
        const {nativeEvent: {layout: {height}}} = e;
        this.height = height;
        this.forceUpdate();
    }

    clearLocalState() {
        this.setState(() => {
            return ({
                title: '',
            });
        })
    }

    handleTextChange = (title) => {
        this.setState({title});
    }

    submit = () => {
        const {title} = this.state
        const {handleSubmit} = this.props
        if (title !== "") {
            Keyboard.dismiss()
            handleSubmit({title, questions: []})
            this.clearLocalState()
            this.toHome()
            saveDeckTitle(title)
        }
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
    }

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window')
        const disabled = this.state.title === ""
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 50} // adjust the value here if you need more padding
                style={{flex: 1}}
                behavior="padding"
            >
                <ScrollView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[
                        styles.container,
                        {
                            minHeight: this.height || heightOfDeviceScreen
                        }]}
                    onLayout={this.onLayout.bind(this)}
                >
                    <NavigationEvents
                        onDidFocus={() => this.titleInput.focus()}
                    />
                    <View Style={styles.inner}>
                        <Text style={styles.header2}>
                            What is the title of your new deck?
                        </Text>
                        <TextInput
                            ref={(input) => {
                                this.titleInput = input;
                            }}
                            name="title"
                            style={styles.input}
                            placeholder="Deck Title"
                            onChangeText={this.handleTextChange}
                            value={this.state.title}
                        />
                        <View style={styles.btnContainer}>
                            <SubmitBtn onPress={this.submit} disabled={disabled}/>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 30,
        marginLeft: 30,
    },
    inner: {
        padding: 50,
        flex: 1,
        justifyContent: "flex-end",
    },
    header1: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 28,
        textAlign: 'center',
    },
    header2: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 48,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: white,
        marginTop: 12,
        marginLeft: 40,
        marginRight: 40,
    },
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        handleSubmit: (deck) => {
            dispatch(addDeck(deck))
        }
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(NewDeck)
