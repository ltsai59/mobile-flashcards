import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { blue, pink, purple, white } from '../utils/colors'
import TextButton from './TextButton'
import {
    clearLocalNotification,
    setLocalNotification
} from "../utils/helpers"
import CardFlip from 'react-native-card-flip'
import { isIOS } from '../utils/helpers'

class QuizView extends Component {
    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('title', '');
        return {
            title: `${title} Quiz`
        };
    };
    state = {
        title: this.props.title,
        correctCount: 0,
        incorrectCount: 0,
        currentIndex: 0
    }

    CorrectPressed = () => {
        this.setState(() => {
            return ({
                correctCount: this.state.correctCount + 1,
                currentIndex: this.state.currentIndex + 1
            });
        })
    }

    InCorrectPressed = () => {
        this.setState(() => {
            return ({
                incorrectCount: this.state.incorrectCount + 1,
                currentIndex: this.state.currentIndex + 1
            });
        })
    }

    handleReset = () => {
        this.setState(() => {
            return ({
                correctCount: 0,
                incorrectCount: 0,
                currentIndex: 0
            });
        })
    }

    handleLocalNotification = () => {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    render() {
        const {questions} = this.props.deck
        const {correctCount, currentIndex, title} = this.state
        const totalCards = Object(questions).length

        if (totalCards === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.score}>You cannot take a quiz because there are no cards in the deck.</Text>
                    <Text style={styles.score}>Please add some cards and try again.</Text>
                </View>
            )
        }
        if (currentIndex >= totalCards) {
            this.handleLocalNotification()
            const percentageCorrect = (correctCount * 100 / totalCards).toFixed(0)
            return (
                <View style={styles.container}>
                    <Text style={[styles.score, {fontSize: 30}]}>Quiz Complete</Text>
                    <Text style={styles.score}>Percentage Correct</Text>
                    <Text style={styles.score}>{percentageCorrect}%</Text>
                    <TextButton
                        onPress={this.handleReset}
                        style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        buttonTextStyle={styles.buttonText}
                    >
                        Restart Quiz
                    </TextButton>
                    <TextButton
                        onPress={() => {
                            this.handleReset();
                            this.props.navigation.goBack();
                        }}
                        style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        buttonTextStyle={styles.buttonText}
                    >
                        Back to {title} Deck Information
                    </TextButton>
                    <TextButton
                        onPress={() => {
                            this.handleReset();
                            this.props.navigation.navigate('Home');
                        }}
                        style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        buttonTextStyle={styles.buttonText}
                    >
                        Home
                    </TextButton>
                </View>
            )
        }
        const cardsLeft = totalCards - currentIndex - 1;
        return (
            <View style={styles.container}>
                <CardFlip style={styles.cardContainer}  ref={(card) => this.card = card}>
                    <ScrollView>
                    <TouchableOpacity
                        style={styles.card1}
                        onPress={() => this.card.flip()}
                    >
                        <Text style={styles.buttonText}>{questions[currentIndex].question}</Text>
                    </TouchableOpacity>
                    </ScrollView>
                    <ScrollView>
                    <TouchableOpacity
                        style={styles.card2}
                        onPress={() => this.card.flip()}
                    >
                        <Text style={styles.buttonText}>{questions[currentIndex].answer}</Text>
                    </TouchableOpacity>
                    </ScrollView>
                </CardFlip>
                <Text style={styles.note}>Please touch the card to toggle between the question and the answer{"\n"}</Text>
                <View style={styles.btnContainer}>
                    <TextButton
                        onPress={this.CorrectPressed}
                        style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        buttonTextStyle={styles.buttonText}
                    >
                        Correct
                    </TextButton>
                    <TextButton
                        onPress={this.InCorrectPressed}
                        style={isIOS ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        buttonTextStyle={styles.buttonText}
                    >
                        Incorrect
                    </TextButton>
                </View>
                <Text style={styles.note2}>{cardsLeft} out of {totalCards} cards left in the quiz</Text>
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
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: white,
        alignItems: 'center',
        marginTop: 30,
        marginRight: 30,
        marginLeft: 30,
    },
    card1: {
        backgroundColor: blue,
        justifyContent: 'center',
        minHeight: 250,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        alignItems: 'center',
    },
    card2: {
        backgroundColor: pink,
        justifyContent: 'center',
        minHeight: 250,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
    btnContainer: {
        backgroundColor: "white",
        marginRight: 30,
        marginLeft: 30,
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
    note: {
        justifyContent: 'center',
        fontSize: 12,
        textAlign: 'center',
        color: blue
    },
    note2: {
        justifyContent: 'center',
        fontSize: 16,
        textAlign: 'center',
        color: blue
    },
    score: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        color: blue
    }
})

function mapStateToProps(decks, {navigation}) {
    const {title} = navigation.state.params
    const deck = decks[title]
    return {
        deck
    }
}

export default connect(mapStateToProps)(QuizView)
