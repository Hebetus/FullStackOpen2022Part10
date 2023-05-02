import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:token`,
        );
        
        console.log('token retrieved!')
        return accessToken;
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:token`,
            accessToken,
        );
        console.log('token saved!');
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`)
    }
}

export default AuthStorage;