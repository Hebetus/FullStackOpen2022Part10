import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import IndividualRepository from './IndividualRepository';
import NewReview from './NewReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} exact />
                <Route path='/repositories/:userId' element={<IndividualRepository />} />
                <Route path='/signin' element={<SignIn />} exact />
                <Route path='/newReview' element={<NewReview />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/myreviews' element={<MyReviews />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </View>
    );
};

export default Main;