// utils/helpers.js

import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
const NOTIFICATION_KEY = 'UdaciMobileFlashCards:notifications'
export const DECK_STORAGE_KEY = 'UdaciMobileFlashCards'
export const isIOS = Platform.OS === 'ios'

export function formatDeckOverview (deck) {
    if (deck === null || deck === undefined) {
        return undefined
    }
    const { title, questions }  = deck
    return {
        title,
        cardCount: questions.length
    }
}

function createNotification () {
    return {
        title: 'Flash card practice!',
        body: "👋 don't forget to practice flash card today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(7)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

