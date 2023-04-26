import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 4,
        padding: 5,
        marginBottom: 7,
    },
});

const TextInput = ({ style, error, ...props }) => {
    return (
        <View style={[styles.inputField, { borderColor: error ? 'red' : 'black' }]}>
            <NativeTextInput  {...props} />
        </View>
    );
};

export default TextInput;