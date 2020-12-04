import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Button,
    useWindowDimensions,
    Animated,
} from 'react-native';
import { EndGameProps } from './AnimatedEndGame.types';
import styles from './AnimatedEndGame.style';
import { EndGame } from '../Grid/Grid.types';

export const AnimatedEndGame: React.FC<EndGameProps> = (
    props: EndGameProps
) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const modalHeightAnim = useRef(new Animated.Value(height / 5)).current;
    const modalTopAnim = useRef(new Animated.Value(height)).current;

    const enter = () => {
        Animated.sequence([
            Animated.timing(modalTopAnim, {
                toValue: (7 * height) / 16,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.parallel([
                Animated.timing(modalTopAnim, {
                    toValue: (7 * height) / 16 - 10,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(modalHeightAnim, {
                    toValue: height / 5 + 20,
                    duration: 250,
                    useNativeDriver: false,
                }),
            ]),
            Animated.parallel([
                Animated.timing(modalTopAnim, {
                    toValue: (7 * height) / 16,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(modalHeightAnim, {
                    toValue: height / 5,
                    duration: 250,
                    useNativeDriver: false,
                }),
            ]),
        ]).start();
    };
    const exit = () => {
        Animated.timing(modalTopAnim, {
            toValue: height,
            duration: 1000,
            useNativeDriver: false,
        }).start(({}) => props.handleRetry());
    };

    useEffect(() => {
        if (props.gameResult !== EndGame.NotYet) {
            enter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.gameResult]);

    return (
        <Animated.View
            style={[
                styles.mainContainer,
                {
                    height: modalHeightAnim,
                    top: modalTopAnim,
                },
            ]}
        >
            <View style={[styles.container, { height: height / 5 }]}>
                <Text style={styles.text}>You have {props.gameResult} !</Text>
                <View style={{ width: 0.3 * width }}>
                    <Button title="Retry" onPress={() => exit()} />
                </View>
            </View>
        </Animated.View>
    );
};
