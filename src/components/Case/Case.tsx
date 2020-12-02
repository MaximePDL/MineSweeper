import React, { useContext, useState } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { CaseProps } from 'types';
import styles from './CaseStyle';
import { GameFinished, numberColors } from 'constants';

export const Case: React.FC<CaseProps> = (props: CaseProps) => {
    const gameEnd = useContext(GameFinished);
    const [lose, setLose] = useState(false);

    const handleTouchCase = () => {
        var toReveal = 0;

        if (!props.revealed && props.labeled === 'none' && !gameEnd) {
            if (props.isMine) {
                setLose(true);
            }
            toReveal = props.revealFn(1);
        }
        if (!gameEnd) {
            props.updateProgression(toReveal);
        }
    };

    const handleLongTouchCase = () => {
        if (!props.revealed && !gameEnd) {
            props.labelFn();
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={handleTouchCase}
            onLongPress={handleLongTouchCase}
        >
            {!props.revealed ? (
                <View style={styles['case-container']}>
                    <Image
                        style={styles['image-case']}
                        source={require('../../../assets/Case.png')}
                    />

                    {props.labeled === 'flag' ? (
                        <Image
                            style={styles['image-flag']}
                            source={require('../../../assets/redFlag.png')}
                        ></Image>
                    ) : props.labeled === 'questionMark' ? (
                        <Image
                            style={styles['image-flag']}
                            source={require('../../../assets/questionMark.png')}
                        />
                    ) : null}
                </View>
            ) : (
                <View
                    style={
                        lose
                            ? styles['case-revealed-lose']
                            : styles['case-revealed']
                    }
                >
                    {props.nearMines !== 0 && (
                        <Text
                            style={{
                                color: numberColors[props.nearMines],
                                ...styles['numbers']
                            }}
                        >
                            {props.nearMines}
                        </Text>
                    )}
                    {props.isMine && (
                        <Image
                            style={styles['image-flag']}
                            source={require('../../../assets/landMineIcon.png')}
                        />
                    )}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};
