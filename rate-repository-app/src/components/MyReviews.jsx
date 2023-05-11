import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { CHECK_AUTHORIZATION } from "../graphql/queries";
import theme from "../theme";

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

const MyReviews = () => {
    const { loading, error, data, refetch } = useQuery(CHECK_AUTHORIZATION, {
        variables: { includeReviews: true }
    });

    const reviews = data.me.reviews;

    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];
    
    console.log(reviewNodes);

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => (
                <Review
                    item={item}>
                </Review>
            )}
        />
    );
};

export default MyReviews;