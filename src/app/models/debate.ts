import { DebateVote } from "../enums/voteDebate";

export class Debate {
    id: string = '';
    title: string = '';
    description: string = '';
    topicId?: string = '';
    argumentId?: string = '';
    score: number = 0;
    nbVotes: number = 0;
    hasVote: DebateVote | null = null;
}