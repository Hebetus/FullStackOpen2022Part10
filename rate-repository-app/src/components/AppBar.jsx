import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useContext, useEffect } from 'react';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';

import { CHECK_AUTHORIZATION } from '../graphql/queries';

import AuthStorageContext from '../contexts/AuthStorageContext';

import theme from '../theme';

const styles = StyleSheet.create({
    flexContainer: {
        display: theme.flexValues.displayFlex,
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
    flexItem: {
        flexGrow: theme.flexValues.growFlex,
    },
    appbar: {
        color: theme.colors.appBarText,
        fontWeight: theme.fontWeights.bold,
        fontFamily: theme.fonts.main,
        padding: theme.paddingValues.normal
    },
    scrollview: {
        marginHorizontal: 10,
    },
})

const AppBar = () => {
    const { loading, error, data } = useQuery(CHECK_AUTHORIZATION);

    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const onSignOut = () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    console.log(data.me);

    return (
        <View style={styles.flexContainer}>
            <ScrollView style={styles.scrollview} horizontal>
                <Pressable onPress={() => console.log('button pressed')}>
                    <Link to="/">
                        <Text style={styles.appbar}>Repositories</Text>
                    </Link>
                </Pressable>
                {data.me ?
                    <Pressable onPress={onSignOut}>
                        <Text style={styles.appbar}>Sign out</Text>
                    </Pressable>
                    :
                    <Link to="/signin">
                        <Text style={styles.appbar}>Sign in</Text>
                    </Link>
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;