import { createStackNavigator } from "react-navigation-stack"
import TabNav from "../navigation/MainTabNavigator"
import IndividualDeck from "../components/IndividualDeck"
import { purple, white } from "../utils/colors"
import { Dimensions } from "react-native"
import NewQuestion from "../components/NewQuestion"
import QuizView from "../components/QuizView"

const windowWidth = Dimensions.get("window").width
const MainNavigator = createStackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions: {
            header: null
        },
    },
    IndividualDeck: {
        screen: IndividualDeck,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
                textAlign: 'center',
            },
            headerTitleStyle: { width: windowWidth }
        }),
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            headerTitleStyle: { width: windowWidth }
        }),
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            headerTitleStyle: { width: windowWidth }
        }),
    },
});

export default MainNavigator
