import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const [repositories, setRepositories] = useState();

    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        variables: {
            orderBy: orderBy,
            orderDirection: orderDirection,
            searchKeyword: searchKeyword,
        },
    });

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [loading]);

    return { repositories, loading, refetch };
};

export default useRepositories;