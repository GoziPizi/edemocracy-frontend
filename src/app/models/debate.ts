import { PoliticSides } from "../enums/politicSides";
import { DebateVote } from "../enums/voteDebate";

export class Debate {
    id: string = '';
    title: string = '';
    content: string = '';
    isFlaged: boolean = false;
    topicId?: string = '';
    argumentId?: string = '';
    partyId?: string = '';
    partyCreatorId?: string = '';
    personnalityId?: string = '';
    personnalityCreatorId?: string = '';
    debateResult: DebateResult = new DebateResult();
    debateContributorsResult: DebateResult = new DebateResult();
    hasVote: DebateVote | null = null;
    parentDebateId?: string;
}

export class DebateVoteFromUser {
    id: string = '';
    value: DebateVote = DebateVote.NEUTRAL;
    userId: string = '';
    isFromContributor: boolean = false;
    debateId: string = '';
}

export class DebateResult {
    id: string = '';
    nbReallyFor: number = 0;
    nbFor: number = 0;
    nbAgainst: number = 0;
    nbReallyAgainst: number = 0;
    nbNeutral: number = 0;
}

export class DebateDescriptionReformulation {
    id: string = '';
    debateId: string = '';
    content: string = '';
    title: string = '';
    score: number = 0;
    likes: number = 0; // ➕ AJOUTER cette ligne
    isFlaged: boolean = false;
    createdAt: string = '';
    userName?: string;
    userPoliticSide?: PoliticSides;
    userWork?: string; 
}


export class DebateReformulationVote {
    id: string = '';
    debateReformulationId: string = '';
    userId: string = '';
    value: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}