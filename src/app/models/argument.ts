export enum ArgumentType {
    FOR = 'FOR',
    AGAINST = 'AGAINST',
    SOLUTION = 'SOLUTION'
}

export class Argument {
    id: string = '';
    content: string = 'Il n\'y a pas encore d\'argument';
    userId: string = '';
    debateId: string = '';
    type: ArgumentType = ArgumentType.FOR;
    nbGood: number = 0;
    nbBad: number = 0;
    childDebateId: string = '';
    hasVote: boolean | null = null;
    createdAt: string = '';
    updatedAt: string = '';
}