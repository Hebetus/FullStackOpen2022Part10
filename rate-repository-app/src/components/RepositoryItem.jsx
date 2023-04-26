import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';

import Text from './Text';

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
        <View>
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

export default RepositoryItem