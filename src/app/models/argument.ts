export class Argument {
    id: string = '';
    content: string = 'Il n\'y a pas encore d\'argument';
    userId: string = '';
    debateId: string = '';
    nbGood: number = 0;
    nbBad: number = 0;
    hasVote: boolean | null = null;
    createdAt: string = '';
    updatedAt: string = '';
}