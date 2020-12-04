import { GameSettings } from 'src/Containers/Game/Game.types';
import { Case } from '../Case/Case.types';

export enum EndGame {
    Win = 'won',
    Lose = 'lost',
    NotYet = 'to continue',
}

export interface GridProps {
    handleEndGame: Function;
    gameSettings: GameSettings;
    handleRetry: Function;
    handleChangeSettings: Function;
}

export interface State {
    gameMatrix: Case[][];
    toDiscover: number;
    toFlag: number;
    endGame: EndGame;
}
