import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { CaseProps, Label } from './Case.types';
import styles from './Case.styles';
import { numberColors } from 'Constants';

const handleTouch = (
    setLoseByMe: Function,
    reveal: Function,
    isMine: boolean
) => {
    if (isMine) {
        setLoseByMe(true);
    }

    reveal();
};

const handleLongTouch = (label: Function) => {
    label();
};
export const Case: React.FC<CaseProps> = (props: CaseProps) => {
    const [loseByMe, setLoseByMe] = useState(false);

    return (
        <TouchableWithoutFeedback
            onPress={() =>
                handleTouch(setLoseByMe, props.revealFn, props.isMine)
            }
            onLongPress={() => handleLongTouch(props.labelFn)}
        >
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
                        ></Image>
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
                                ...styles['numbers']
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
};
