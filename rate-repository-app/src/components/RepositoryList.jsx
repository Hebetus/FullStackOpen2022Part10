import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    header: {
        backgroundColor: 'grey',
    },
    input: {
        padding: 7,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        fontWeight: '600',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const [selectedValue, setSelectedValue] = useState();

    const [orderBy, setOrderBy] = useState();
    const [orderDirection, setOrderDirection] = useState();

    const [serchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        if (selectedValue === 'latest') {
            setOrderBy('CREATED_AT')
            setOrderDirection('DESC')
        };
    
        if (selectedValue === 'highest') {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('DESC')
        };
    
        if (selectedValue === 'lowest') {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('ASC');
        };
    }, [selectedValue])
    
    console.log(orderBy, orderDirection);

    const { repositories } = useRepositories(orderBy, orderDirection, serchQuery);

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    
    console.log(repositoryNodes);

    return (
        <FlatList
            ListHeaderComponent={
                <View style={styles.header}>
                    <TextInput
                        placeholder='Search'
                        value={serchQuery}
                        onChangeText={onChangeSearch}
                        style={styles.input}
                    />
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => {
                            setSelectedValue(itemValue);
                        }}>
                            <Picker.Item label='Latest repositories' value='latest' />
                            <Picker.Item label='Highest rated repositories' value='highest' />
                            <Picker.Item label='Lowest rated repositories' value='lowest' />
                    </Picker>
                </View>
            }
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <RepositoryItem
                    item={item}>
                </RepositoryItem>
            )}
        />
    );
};

export default RepositoryList;