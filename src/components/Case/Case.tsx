import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    Vibration
} from 'react-native';
import { CaseProps } from 'types';
import styles from './CaseStyle';
import { numberColors } from 'constants';

export const Case: React.FC<CaseProps> = (props: CaseProps) => {
    const [labeled, setLabeled] = useState('none');
    const [revealed, setRevealed] = useState(false);

    const handleTouchCase = () => {
        if (labeled === 'none') {
            setRevealed(true);
        }
    };

    const handleLongTouchCase = () => {
        switch (labeled) {
            case 'none':
                setLabeled('flag');
                break;
            case 'flag':
                setLabeled('questionMark');
                break;
            case 'questionMark':
                setLabeled('none');
                break;
        }
        Vibration.vibrate(100);
    };

    return (
        <TouchableWithoutFeedback
            onPress={handleTouchCase}
            onLongPress={handleLongTouchCase}
        >
            {!revealed ? (
                <View style={styles['case-container']}>
                    <Image
                        style={styles['image-case']}
                        source={require('../../../assets/Case.png')}
                    />

                    {labeled === 'flag' ? (
                        <Image
                            style={styles['image-flag']}
                            source={require('../../../assets/redFlag.png')}
                        ></Image>
                    ) : labeled === 'questionMark' ? (
                        <Image
                            style={styles['image-flag']}
                            source={require('../../../assets/questionMark.png')}
                        />
                    ) : null}
                </View>
            ) : (
                <View style={styles['case-revealed']}>
                    <Text
                        style={{
                            color: numberColors[props.nearMines],
                            ...styles['numbers']
                        }}
                    >
                        {props.nearMines}
                    </Text>
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};
