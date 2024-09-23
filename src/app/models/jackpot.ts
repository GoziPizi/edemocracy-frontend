export enum JackpotStatus {
    PENDING = 'PENDING',
    REQUESTED = 'REQUESTED',
}

export class personalJackpot {
    jackpotAmount: number = 0;
    status: JackpotStatus = JackpotStatus.PENDING;
    IBAN: string | null = null;
}

export class adminViewPersonalJackpot extends personalJackpot {
    userId: string = '';
}