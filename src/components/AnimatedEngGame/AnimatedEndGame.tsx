import { GameFinished } from 'constants';
import React, { useContext, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Button,
    useWindowDimensions,
    Animated
} from 'react-native';
import { EndGameProps } from 'types';
import styles from './AnimatedEndGameStyle';

export const AnimatedEndGame: React.FC<EndGameProps> = (
    props: EndGameProps
) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const gameEnd = useContext(GameFinished);
    const modalHeightAnim = useRef(new Animated.Value(height / 5)).current;
    const modalTopAnim = useRef(new Animated.Value(height)).current;

    const enter = () => {
        Animated.sequence([
            Animated.timing(modalTopAnim, {
                toValue: (7 * height) / 16,
                duration: 1000,
                useNativeDriver: false
            }),
            Animated.parallel([
                Animated.timing(modalTopAnim, {
                    toValue: (7 * height) / 16 - 10,
                    duration: 250,
                    useNativeDriver: false
                }),
                Animated.timing(modalHeightAnim, {
                    toValue: height / 5 + 20,
                    duration: 250,
                    useNativeDriver: false
                })
            ]),
            Animated.parallel([
                Animated.timing(modalTopAnim, {
                    toValue: (7 * height) / 16,
                    duration: 250,
                    useNativeDriver: false
                }),
                Animated.timing(modalHeightAnim, {
                    toValue: height / 5,
                    duration: 250,
                    useNativeDriver: false
                })
            ])
        ]).start();
    };
    const exit = () => {
        Animated.timing(modalTopAnim, {
            toValue: height,
            duration: 1000,
            useNativeDriver: false
        }).start(({ finished }) => props.handleRetry());
    };

    useEffect(() => {
        if (gameEnd) {
            enter();
        }
    }, [gameEnd]);

    return (
        <Animated.View
            style={{
                position: 'absolute',

                borderRadius: 20,
                zIndex: 1000,
                aspectRatio: 1.4,
                height: modalHeightAnim,
                top: modalTopAnim,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View style={[styles.container, { height: height / 5 }]}>
                <Text style={styles.text}>You have {props.gameResult} !</Text>
                <View style={{ width: 0.3 * width }}>
                    <Button title="Retry" onPress={() => exit()}></Button>
                </View>
            </View>
        </Animated.View>
    );
};
