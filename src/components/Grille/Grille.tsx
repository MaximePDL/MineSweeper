import React, { useState } from 'react';
import { View } from 'react-native';

export const Grille: React.FC = () => {
    const [tab, setTab] = useState(Array(6).fill(false));
    const [label, setLabel] = useState(Array(6).fill(false));

    const reveal = () => {
        tab[0] = true;
        setTab(tab);
    };
    const labeled = () => {
        label[0] = true;
        setLabel(label);
    };
    return <View></View>;
};
