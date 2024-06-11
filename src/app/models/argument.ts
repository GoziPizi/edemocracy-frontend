import { PoliticSides } from "../enums/politicSides";

export enum ArgumentType {
    FOR = 'FOR',
    AGAINST = 'AGAINST',
    SOLUTION = 'SOLUTION'
}

export class Argument {
    id: string = '';
    title: string = 'Titre par défaut';
    content: string = 'Contenu par défaut';
    userId?: string = '';
    anonymous: boolean = false;
    debateId: string = '';
    type: ArgumentType = ArgumentType.FOR;
    nbGood: number = 0;
    nbBad: number = 0;
    childDebateId?: string = '';
    hasVote: boolean | null = null;
    createdAt: string = '';
    updatedAt: string = '';
    userName?: string;
    userPoliticSide?: PoliticSides;
    userWork?: string; 
}