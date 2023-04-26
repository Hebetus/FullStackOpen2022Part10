import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

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
    return (
        <View style={styles.flexContainer}>
            <ScrollView style={styles.scrollview} horizontal>
                <Pressable onPress={() => console.log('button pressed')}>
                    <Link to="/">
                        <Text style={styles.appbar}>Repositories</Text>
                    </Link>
                </Pressable>
                <Link to="/signin">
                    <Text style={styles.appbar}>Sign in</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;