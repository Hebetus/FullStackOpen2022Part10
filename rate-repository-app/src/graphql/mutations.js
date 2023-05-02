import { gql } from '@apollo/client';

export const CREATE_ACCESSTOKEN = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`