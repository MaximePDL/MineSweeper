import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    text: {
        textAlign: 'center',
    },
    mainContainer: {
        position: 'absolute',
        borderRadius: 20,
        zIndex: 1000,
        aspectRatio: 1.4,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});
