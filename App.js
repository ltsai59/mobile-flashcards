import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { gray } from './utils/colors'
import { createAppContainer } from "react-navigation"
import { FlashcardStatusBar } from './components/FlashcardStatusBar'
import { setLocalNotification } from './utils/helpers'
import middleware from './middleware'
import MainNavigator from './navigation/MainNavigator'

const store = createStore(
    reducer,
    middleware
)

const MainContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <FlashcardStatusBar
                    backgroundColor={gray}
                    barStyle="light-content"
                />
                <MainContainer/>
            </Provider>
        )
    }
}
