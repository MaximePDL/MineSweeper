import React, { useCallback } from 'react';

import { RowProps } from './Row.types';
import { FlatList } from 'react-native';
import { Case } from '../Case/Case.component';
import { render } from 'react-dom';

export const Row: React.FC<RowProps> = (props: RowProps) => {
    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Case
                {...item}
                revealFn={() =>
                    props.dispatch({
                        type: 'reveal',
                        payload: { x: index, y: props.rowId }
                    })
                }
                labelFn={() =>
                    props.dispatch({
                        type: 'label',
                        payload: { x: index, y: props.rowId }
                    })
                }
            ></Case>
        ),
        [props.dispatch, props.rowId]
    );
    return (
        <FlatList
            horizontal
            data={props.row}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
                (props.rowId * props.row.length + index).toString()
            }
        ></FlatList>
    );
};
