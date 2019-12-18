import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'DailyReminder';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync,
    );
}

function createNotification() {
    return {
        title: 'Mobile Flashcards Notification',
        body: 'Reminder to study!',
        ios: {
            sound: true,
        },
        android: {
            channelId: CHANNEL_ID,
            sticky: false,
            color: 'pink',
        },
    };
}

function createChannel() {
    return {
        name: 'Mobile Flashcards Reminder',
        description: 'Reminder to study!',
        sound: true,
    };
}

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === 'granted') {
                            Notifications.createChannelAndroidAsync(
                                CHANNEL_ID,
                                createChannel(),
                            ).then(() => {
                                Notifications.cancelAllScheduledNotificationsAsync();

                                const date = new Date();
                                date.setDate(date.getDate() + 1);
                                date.setHours(1);
                                date.setMinutes(0);

                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: date,
                                        repeat: '1 hours',
                                    },
                                );

                                AsyncStorage.setItem(
                                    NOTIFICATION_KEY,
                                    JSON.stringify(true),
                                );
                            });
                        }
                    },
                );
            }
        });
}
