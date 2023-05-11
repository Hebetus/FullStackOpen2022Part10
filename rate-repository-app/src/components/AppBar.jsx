import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useContext, useEffect, useState } from 'react';
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
    const { loading, error, data, refetch } = useQuery(CHECK_AUTHORIZATION);
    const [loginStatus, setLoginStatus] = useState(false);

    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const onSignOut = () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
        setLoginStatus(false);
        console.log('changed', loginStatus)
    };

    useEffect(() => {
        if (data) {
            if (data.me) {
                setLoginStatus(true);
            }
        }
    }, [authStorage.getAccessToken()]);
    
    useEffect(() => {
        if (authStorage.getAccessToken()._A) {
            setLoginStatus(true);
        }
    }, [authStorage.getAccessToken()]);

    return (
        <View style={styles.flexContainer}>
            <ScrollView style={styles.scrollview} horizontal>
                <Pressable onPress={() => console.log('button pressed')}>
                    <Link to="/">
                        <Text style={styles.appbar}>Repositories</Text>
                    </Link>
                </Pressable>
                <Pressable onPress={() => console.log('button pressed')}>
                    <Link to="/newReview">
                        <Text style={styles.appbar}>Create a review</Text>
                    </Link>
                </Pressable>
                {loginStatus ?
                    <Link to="/myreviews">
                        <Text style={styles.appbar}>My reviews</Text>
                    </Link>
                    :
                    null
                }
                {loginStatus ?
                    <Pressable onPress={onSignOut}>
                        <Text style={styles.appbar}>Sign out</Text>
                    </Pressable>
                    :
                    <Link to="/signin">
                        <Text style={styles.appbar}>Sign in</Text>
                    </Link>
                }
                {loginStatus ?
                    null
                    :
                    <Pressable onPress={() => console.log('button pressed')}>
                        <Link to="/signup">
                            <Text style={styles.appbar}>Sign Up</Text>
                        </Link>
                    </Pressable>
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;