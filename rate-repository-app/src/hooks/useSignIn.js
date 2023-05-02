import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';

import AuthStorageContext from '../contexts/AuthStorageContext';

import { CREATE_ACCESSTOKEN } from '../graphql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(CREATE_ACCESSTOKEN);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        mutate({ variables: { credentials: { username: username, password: password } } });
        const token = result.data.authenticate.accessToken;
        console.log(token);
        authStorage.setAccessToken(token);
        apolloClient.resetStore();
        return result.data;
    }

    return [signIn, result];
};

export default useSignIn;