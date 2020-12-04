import React, { useCallback, useState } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { CaseProps, Label } from './Case.types';
import styles from './Case.styles';
import { numberColors } from 'Constants';

export const Case: React.FC<CaseProps> = React.memo((props: CaseProps) => {
    const [loseByMe, setLoseByMe] = useState(false);

    const reveal = useCallback(() => {
        if (props.isMine) {
            setLoseByMe(true);
        }

        props.dispatch({ type: 'reveal', payload: { x: props.x, y: props.y } });
    }, [props]);

    const label = useCallback(() => {
        props.dispatch({ type: 'label', payload: { x: props.x, y: props.y } });
    }, [props]);

    return (
        <TouchableWithoutFeedback onPress={reveal} onLongPress={label}>
            {!props.revealed ? (
                <View style={styles.caseContainer}>
                    <Image
                        style={styles.imageCase}
                        source={require('../../../assets/Case.png')}
                    />

                    {props.labeled === Label.Flag ? (
                        <Image
                            style={styles.imageFlag}
                            source={require('../../../assets/redFlag.png')}
                        />
                    ) : props.labeled === Label.Question ? (
                        <Image
                            style={styles.imageFlag}
                            source={require('../../../assets/questionMark.png')}
                        />
                    ) : null}
                </View>
            ) : (
                <View
                    style={
                        loseByMe ? styles.caseRevealedLose : styles.caseRevealed
                    }
                >
                    {props.nearMines !== 0 && props.nearMines !== -1 && (
                        <Text
                            style={{
                                color: numberColors[props.nearMines],
                                ...styles.numbers,
                            }}
                        >
                            {props.nearMines}
                        </Text>
                    )}
                    {props.isMine && (
                        <Image
                            style={styles.imageFlag}
                            source={require('../../../assets/landMineIcon.png')}
                        />
                    )}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
});
