import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import theme from '../theme';

const RepositoryItem = props => {
    const styles = StyleSheet.create({
        flexContainer: {
            flexDirection: 'row',
            padding: theme.paddingValues.little,
            fontFamily: theme.fonts.main,
        },
        infoContainer: {
            flexDirection: 'column',
            padding: theme.paddingValues.little,
            paddingLeft: theme.paddingValues.extra,
        },
        dataContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.paddingValues.little,
        },
        languageContainer: {
            backgroundColor: theme.colors.primary,
            padding: theme.paddingValues.little,
            borderRadius: 4,
        },
        languagecontainerContainer: {
            flexDirection: 'row',
            padding: 5,
        },
        image: {
            width: theme.imageSizes.normalWidth,
            height: theme.imageSizes.normalHeight,
            padding: theme.paddingValues.normal,
            borderRadius: 5,
        },
    });

    let starsInThousands = ''
    let forksInThousands = ''
    let reviewsInThousands = ''
    let ratingInThousands = ''

    if (props.item.stargazersCount >= 1000) {
        const amount = (Math.round((props.item.stargazersCount / 1000) * 10) / 10).toString()
        starsInThousands = amount + 'k'
    }

    if (props.item.forksCount >= 1000) {
        const amount = (Math.round((props.item.forksCount / 1000) * 10) / 10).toString()
        forksInThousands = amount + 'k'
    }

    if (props.item.reviewCount >= 1000) {
        const amount = (Math.round((props.item.reviewCount / 1000) * 10) / 10).toString()
        reviewsInThousands = amount + 'k'
    }

    if (props.item.ratingAverage >= 1000) {
        const amount = (Math.round((props.item.ratingAverage / 1000) * 10) / 10).toString()
        ratingInThousands = amount + 'k'
    }

    return (
        <View testID="repositoryItem">
                <View style={styles.flexContainer} >
                    <Image
                        style={styles.image}
                        source={{
                            uri: props.item.ownerAvatarUrl,
                        }} 
                    />
                    <View style={styles.infoContainer}>
                        <Text fontWeight='bold' style={{ padding: 5 }}>{props.item.fullName}</Text>
                        <Text style={{ padding: 5 }}>{props.item.description}</Text>
                        <View style={styles.languagecontainerContainer}>
                            <View style={styles.languageContainer}>
                                <Text style={{ color: 'white' }} >{props.item.language}</Text>
                            </View>
                            <Text></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexContainer}>
                    <View style={styles.dataContainer}>
                        <Text fontWeight='bold'>{starsInThousands ? starsInThousands : props.item.stargazersCount}</Text>
                        <Text>Stars</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text fontWeight='bold'>{forksInThousands ? forksInThousands : props.item.forksCount}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text fontWeight='bold'>{reviewsInThousands ? reviewsInThousands : props.item.reviewCount}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text fontWeight='bold'>{ratingInThousands ? ratingInThousands : props.item.ratingAverage}</Text>
                        <Text>Rating</Text>
                    </View>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = props => {
    const repositories = props.repositories;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
        <FlatList
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

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 4,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        
        render(<RepositoryList repositories={repositories} />)

        screen.debug();

        expect(screen.getByText('jaredpalmer/formik')).toBeDefined();
        expect(screen.getByText('Build forms in React, without the tears')).toBeDefined();
        expect(screen.getByText('TypeScript')).toBeDefined();
        expect(screen.getByText('1.6k')).toBeDefined();
        expect(screen.getByText('21.9k')).toBeDefined();
        expect(screen.getByText('88')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();

        expect(screen.getByText('async-library/react-async')).toBeDefined();
        expect(screen.getByText('Flexible promise-based React data loader')).toBeDefined();
        expect(screen.getByText('JavaScript')).toBeDefined();
        expect(screen.getByText('69')).toBeDefined();
        expect(screen.getByText('1.8k')).toBeDefined();
        expect(screen.getByText('72')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
      });
    });
  });