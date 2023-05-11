import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    id
                    ownerAvatarUrl
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                }
                cursor
            }
        }
    }
`;

export const GET_INDIVIDUAL_REPOSITORY = gql`
    query Repository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            url
        }
    }
`;

export const GET_REVIEWS = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
        id
        fullName
        reviews {
            edges {
            node {
                id
                text
                rating
                createdAt
                user {
                id
                username
                }
            }
            }
        }
        }
    }
`;

export const CHECK_AUTHORIZATION = gql`
    query Query($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;