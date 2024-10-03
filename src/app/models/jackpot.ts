export enum JackpotStatus {
    PENDING = 'PENDING',
    REQUESTED = 'REQUESTED',
}

export class personalJackpot {
    amount: number = 0;
    status: JackpotStatus = JackpotStatus.PENDING;
    iban: string | null = null;
}

export class adminViewPersonalJackpot extends personalJackpot {
    userId: string = '';
}