import { Case, Label } from '../Components/Case/Case.types';
import { EndGame } from '../Components/Grid/Grid.types';

import { initGameState } from './useGame';

describe('Game Logic', () => {
    it('initialize correctly', () => {
        const matrix: Case[][] = [
            [
                {
                    nearMines: -1,
                    isMine: true,
                    revealed: false,
                    labeled: Label.None,
                },
            ],
        ];

        expect(initGameState({ width: 1, height: 1, mines: 1 })).toStrictEqual({
            gameMatrix: matrix,
            toDiscover: 0,
            toFlag: 1,
            endGame: EndGame.NotYet,
        });
    });
});
