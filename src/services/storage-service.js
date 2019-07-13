import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {

    async setItem(key, value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    async getItem(key) {
        const value = await AsyncStorage.getItem(key);
        if (value !== null)
            return JSON.parse(value);
        return null;
    }

    async exists(key) {
        const value = await AsyncStorage.getItem(key);
        return value !== null;
    }

}

export default new LocalStorage();