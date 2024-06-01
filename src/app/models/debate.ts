import { DebateVote } from "../enums/voteDebate";

export class Debate {
    id: string = '';
    title: string = '';
    description: string = '';
    topicId?: string = '';
    argumentId?: string = '';
    debateResult: DebateResult = new DebateResult();
    debateContributorsResult: DebateResult = new DebateResult();
    hasVote: DebateVote | null = null;
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
    score: number = 0;
    createdAt: string = '';
}

export class DebateReformulationVote {
    id: string = '';
    debateReformulationId: string = '';
    userId: string = '';
    value: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}