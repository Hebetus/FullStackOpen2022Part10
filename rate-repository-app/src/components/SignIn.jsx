import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 4,
        padding: 5,
    },
    signInButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.paddingValues.little,
        borderRadius: 4,
        alignItems: 'center'
    },
    signInText: {
        color: 'white'
    },
    signInContainer: {
        fontFamily: theme.fonts.main,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        padding: theme.paddingValues.little,
        justifyContent: 'flex-start',
        gap: 20,
    }
})

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
});

const SignIn = () => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <View style={styles.signInContainer}>
                    <FormikTextInput name="username" placeholder="Username" />
                    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
                    <Button onPress={handleSubmit} title="Sign in" color="#0366d6" />
                </View>
            )}
        </Formik>
    );
};

export default SignIn;