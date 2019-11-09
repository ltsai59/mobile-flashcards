import React, { Component } from "react"
import { connect } from 'react-redux'
import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    View,
    Dimensions
} from "react-native"
import { white } from '../utils/colors'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { Header } from 'react-navigation-stack'
import { addCardToDeck } from '../utils/api'
import { SubmitBtn } from './SubmitBtn'

class NewQuestion extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        };
    };

    state = {
        title: this.props.title,
        question: '',
        answer: '',
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
                question: '',
                answer: '',
            });
        })
    }

    submit = () => {
        const { title, question, answer } = this.state
        const { handleSubmit } = this.props
        if (question !== "" && answer !== "") {
            Keyboard.dismiss()

            handleSubmit( title,{ question, answer })
            this.clearLocalState()
            this.toPrevScreen()
            addCardToDeck(title, {question, answer})

        }

    }

    toPrevScreen = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window')
        const disabled = this.state.question === "" || this.state.answer === ""
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
                    <View Style={styles.inner}>
                        <Text style={styles.header}>
                           Add a question and answer
                        </Text>
                        <TextInput
                            name="question"
                            autoFocus={true}
                            style={styles.input}
                            placeholder="Question"
                            onChangeText={(question) => this.setState({question})}
                            value={this.state.question}
                            onSubmitEditing={() => {
                                this.refs.answer.focus();
                            }}
                        />
                        <TextInput
                            name="answer"
                            ref='answer'
                            style={styles.input}
                            placeholder="Answer"
                            onChangeText={(answer) => this.setState({answer})}
                            value={this.state.answer}
                        />
                        <View style={styles.btnContainer}>
                            <SubmitBtn onPress={this.submit} disabled={disabled} />
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
    header: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 48,
        textAlign: 'center',
    },
    input: {
        height: 40,
        fontSize: 14,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12,
    },
})

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params
    return {
        title
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        handleSubmit: (title, card) => {
            dispatch(addCard(title, card))}
    })
}

export default connect (mapStateToProps, mapDispatchToProps)(NewQuestion)
