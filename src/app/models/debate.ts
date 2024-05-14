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
    score: number = 0;
    nbVotes: number = 0;
}