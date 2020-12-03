export interface GameSettings {
    mines: number;
    width: number;
    height: number;
}

export interface useGameArgs {
    gameSettings: GameSettings;
    handleEndGame: Function;
}
