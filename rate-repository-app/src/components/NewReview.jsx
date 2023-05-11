import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, StyleSheet, Button } from 'react-native';

import FormikTextInput from './FormikTextInput';

import theme from '../theme';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

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
    ownername: '',
    repositoryname: '',
    rating: 0,
    text: ''
}

const validationSchema = yup.object().shape({
    ownername: yup
        .string()
        .required('Repository owner name is required'),
    repositoryname: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required('Rating is required'),
    review: yup
        .string()
})

const NewReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { ownername, repositoryname, rating, text } = values;
        const reviewObject = {
            
        }

        console.log(ownername, repositoryname, rating, text);

        try {
            await mutate({ variables: { review: { repositoryName: repositoryname, ownerName: ownername, rating: rating, text: text } } });
            const repositoryId = result.data.createReview.repositoryId;
            console.log(repositoryId);
            navigate(`/repositories/${repositoryId}`);
        }
        catch (e) {
            console.log(e)
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
                    <FormikTextInput name="ownername" placeholder="Repository owner name" />
                    <FormikTextInput name="repositoryname" placeholder="Repository name" />
                    <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
                    <FormikTextInput name="text" placeholder="Review" multiline />
                    <Button onPress={handleSubmit} title="Create a review" color="#0366d6"/>
                </View>
            )}
        </Formik>
    );
};

export default NewReview;