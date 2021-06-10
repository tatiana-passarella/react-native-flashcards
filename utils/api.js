import AsyncStorage from '@react-native-async-storage/async-storage';
import decks from './_DATA';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
const STORAGE_KEY = 'MY_mobile-flashcards:decks';
const NOTIFICATION_KEY = 'MY_mobile-flashcards:notifications';

async function merge(data) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getStore(data = decks) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getDecks() {
  try {
    const allDecks = await AsyncStorage.getItem(STORAGE_KEY);
    if (!allDecks) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    }
    return allDecks ? JSON.parse(allDecks) : decks;

  } catch (e) {
        console.warn(e);
  }
}

export async function getDeck(id) {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;

        return data[id];

    } catch (e) {
        console.warn(e);
    }
}

export async function saveDeck(title) {
    try {
        let jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;

        data = {
            ...data,
            [title]: {
                title,
                questions: [],
            }
        }

        return merge(data);

    } catch (e) {
        console.warn(e);
    }
}

export async function addNewCardToDeck(title, card) {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;

        data = {
            ...data,
            [title]: {
                title: title,
                questions: [
                    ...data[title].questions,
                    card
                ],
            }
        }

        return merge(data);

    } catch (e) {
        console.warn(e);
    }
}

export async function removeDeck(title) {
  try {
    const allDecks = await AsyncStorage.getItem(STORAGE_KEY);
    const data= JSON.parse(allDecks);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log('Error: ', err);
  }
}

export function setNotification() {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldPlaySound: true,
                  shouldShowAlert: true,
                  shouldSetBadge: false
                })
              })

              let tomorrow = new Date()  
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              const notificationDate = new Date(tomorrow)
              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Hello from FlashCard App',
                  body: "👋 Remember to study today!",
                },
                trigger : notificationDate,
                repeats: true
              })
              AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearNotification() {
  return AsyncStorage.removeItem(STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}