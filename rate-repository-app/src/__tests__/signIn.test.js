import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import { useField, Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: 'red',
    },
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
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

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

const SignIn = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
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

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignIn onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'emil');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
            fireEvent.press(screen.getByText('Sign in'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'emil',
                    password: 'password',
                });
            });
        });
    });
});