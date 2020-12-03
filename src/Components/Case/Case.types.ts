export enum Label {
    None = 'NONE',
    Flag = 'FLAG',
    Question = 'QUESTION'
}

export interface Case {
    isMine: boolean;
    nearMines: number;
    revealed: boolean;
    labeled: Label;
}

export interface CaseProps extends Case {
    dispatch: Function;
    x: number;
    y: number;
}
