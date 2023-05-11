import { Formik } from "formik";
import { View, StyleSheet, Button } from "react-native";
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 4,
        padding: 5,
    },
    reviewButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.paddingValues.little,
        borderRadius: 4,
        alignItems: 'center'
    },
    reviewText: {
        color: 'white'
    },
    reviewContainer: {
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
    password: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(30)
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirmation is required')
})

const SignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password, passwordConfirmation } = values;
        const userInput = {
            username: username,
            password: password,
        }

        console.log(userInput);

        try {
            await mutate({ variables: { user: userInput } });
            console.log(result.data);
            try {
                await signIn({ username, password });
            }
            catch (e) {
                console.log(e)
            }
            navigate('/')
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <View style={styles.reviewContainer}>
                    <FormikTextInput name="username" placeholder="Username" />
                    <FormikTextInput name="password" placeholder="Password" />
                    <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" />
                    <Button onPress={handleSubmit} title="Sign Up" color="#0366d6" />
                </View>
            )}
        </Formik>
    );
};

export default SignUp;