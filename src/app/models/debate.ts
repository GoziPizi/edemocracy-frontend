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