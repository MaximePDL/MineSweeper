import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        height: 50,
        backgroundColor: '#DCDCDC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: { width: 25, height: 25 },
    text: {
        fontSize: 20,
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
