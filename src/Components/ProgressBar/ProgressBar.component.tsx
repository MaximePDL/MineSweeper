import React, { useState } from 'react';

import { ProgressProps } from './ProgressBar.types';
import styles from './ProgressBar.styles';
import {
    View,
    Image,
    Text,
    Button,
    useWindowDimensions,
    Modal,
    TextInput,
} from 'react-native';
import Chronometer from '../Chronometer/Chronometer.component';

export const ProgressBar = ({
    toFlag,
    handleRetry,
    endGame,
    toDiscover,
    handleChangeSettings,
}: ProgressProps) => {
    const width = useWindowDimensions().width;
    const [visible, setVisible] = useState(false);
    const [widthSett, setWidthSett] = useState(9);
    const [heightSett, setHeightSett] = useState(9);
    const [minesSett, setMinesSett] = useState(9);

    return (
        <View style={[styles.mainContainer, { width: width }]}>
            <View style={[styles.viewStyle, { width: width / 4 }]}>
                <Image
                    style={styles.image}
                    source={require('assets/landMineIcon.png')}
                />
                <Text style={styles.text}>{toFlag}</Text>
            </View>
            <View style={[styles.viewStyle, { width: width / 4 }]}>
                <Button title="New Game" onPress={() => handleRetry()} />
            </View>
            <View style={[styles.viewStyle, { width: width / 4 }]}>
                <Chronometer endGame={endGame} toDiscover={toDiscover} />
            </View>
            <View style={[styles.viewStyle, { width: width / 4 }]}>
                <Button title="Settings" onPress={() => setVisible(true)} />
            </View>
            <Modal animationType="slide" visible={visible}>
                <View>
                    <Text>Width :</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => setWidthSett(+text)}
                    />
                    <Text>Height :</Text>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => setHeightSett(+text)}
                    />
                    <Text>Mines :</Text>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => setMinesSett(+text)}
                    />
                    <Button
                        title="Save"
                        onPress={() => {
                            setVisible(false);
                            handleChangeSettings(
                                widthSett,
                                heightSett,
                                minesSett
                            );
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default ProgressBar;
