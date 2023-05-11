import { View, Image, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_INDIVIDUAL_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import theme from '../theme';
import { useEffect, useState } from 'react';

const Review = (props) => {
    const styles = StyleSheet.create({
        reviewContainer: {
            flexDirection: 'row',
        },
        rating: {
            color: '#0366d6',
            margin: 7,
            fontWeight: 'bold',
        },
        ratingContainer: {
            borderColor: '#0366d6',
            borderStyle: 'solid',
            borderWidth: 2,
            borderRadius: 100,
            margin: 5,
        },
    });

    return (
        <View>
            <View style={styles.reviewContainer}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{props.item.rating} </Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{props.item.user.username}</Text>
                    <Text style={{ color: 'grey', fontWeight: '500' }}>{props.item.createdAt.substring(0, 10).replace(/-/g, ".")}</Text>
                </View>
            </View>
            <View style={{ padding: 5 }}>
                <Text style={{ fontWeight: '450' }}>{props.item.text}</Text>
            </View>
        </View>
    );
};

const IndividualRepository = () => {
    const [reviewNodes, setReviewNodes] = useState([]);
    const { userId } = useParams();
    const repositoryId = userId;
    const { loading, error, data } = useQuery(GET_INDIVIDUAL_REPOSITORY, {
        variables: { repositoryId },
    });

    const query = useQuery(GET_REVIEWS, {
        variables: { repositoryId },
    });

    useEffect(() => {
        if (query.data) {
            const reviewData = query.data.repository.reviews;
            reviewData
                ? setReviewNodes(reviewData.edges.map(edge => edge.node))
                : [];
            console.log(reviewNodes);
        }
    }, [query.loading]);

    let item = {
        ownerAvatarUrl: 'joo',
        fullName: '',
        description: '',
        language: '',
        stargazersCount: 0,
        forksCount: 0,
        reviewCount: 0,
        ratingAverage: 0,
        url: '',
    };

    if (data) {
        item = data.repository
    }

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
        buttonContainer: {
            backgroundColor: theme.colors.primary,
            padding: theme.paddingValues.little,
            borderRadius: 4,
            margin: 5,
            alignItems: 'center',
        }
    });

    let starsInThousands = ''
    let forksInThousands = ''
    let reviewsInThousands = ''
    let ratingInThousands = ''

    if (item.stargazersCount >= 1000) {
        const amount = (Math.round((item.stargazersCount / 1000) * 10) / 10).toString()
        starsInThousands = amount + 'k'
    }

    if (item.forksCount >= 1000) {
        const amount = (Math.round((item.forksCount / 1000) * 10) / 10).toString()
        forksInThousands = amount + 'k'
    }

    if (item.reviewCount >= 1000) {
        const amount = (Math.round((item.reviewCount / 1000) * 10) / 10).toString()
        reviewsInThousands = amount + 'k'
    }

    if (item.ratingAverage >= 1000) {
        const amount = (Math.round((item.ratingAverage / 1000) * 10) / 10).toString()
        ratingInThousands = amount + 'k'
    }

    const openInWeb = () => {
        Linking.openURL(item.url)
    }

    return (
        <>
            <View style={styles.flexContainer} >
                <Image
                    style={styles.image}
                    source={{
                        uri: item.ownerAvatarUrl,
                    }} 
                />
                <View style={styles.infoContainer}>
                    <Text style={{ padding: 5, fontWeight: 'bold' }}>{item.fullName}</Text>
                    <Text style={{ padding: 5 }}>{item.description}</Text>
                    <View style={styles.languagecontainerContainer}>
                        <View style={styles.languageContainer}>
                            <Text style={{ color: 'white' }} >{item.language}</Text>
                        </View>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <View style={styles.flexContainer}>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{starsInThousands ? starsInThousands : item.stargazersCount}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{forksInThousands ? forksInThousands : item.forksCount}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{reviewsInThousands ? reviewsInThousands : item.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{ratingInThousands ? ratingInThousands : item.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
            <Pressable onPress={openInWeb}>
                <View style={styles.buttonContainer}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Open in GitHub</Text>
                </View>
            </Pressable>
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => (
                    <Review
                        item={item}>
                    </Review>
                )}
            />
        </>
    );
};

export default IndividualRepository;