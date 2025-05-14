import { DebateVote } from "../enums/voteDebate";

export function debateVoteEnumToString(value: DebateVote): string {
    switch (value) {
        case DebateVote.REALLY_AGAINST:
            return 'Très Contre (-2)';
        case DebateVote.AGAINST:
            return 'Contre (-1)';
        case DebateVote.NEUTRAL:
            return 'Neutre (0)';
        case DebateVote.FOR:
            return 'Pour (+1)';
        case DebateVote.REALLY_FOR:
            return 'Très Pour (+2)';
        default:
            return '';
    }
}


export function debateVoteEnumToInt(value: DebateVote): number {
    switch(value){
        case DebateVote.REALLY_AGAINST:
            return -2
        case DebateVote.AGAINST:
            return -1
        case DebateVote.NEUTRAL:
            return 0
        case DebateVote.FOR:
            return 1
        case DebateVote.REALLY_FOR:
            return 2

    }
}

export function debateVoteEnumToStrictString(value: DebateVote): string {
    switch(value){
        case DebateVote.REALLY_AGAINST:
            return 'REALLY_AGAINST'
        case DebateVote.AGAINST:
            return 'AGAINST'
        case DebateVote.NEUTRAL:
            return 'NEUTRAL'
        case DebateVote.FOR:
            return 'FOR'
        case DebateVote.REALLY_FOR:
            return 'REALLY_FOR'

    }
}

export function stringToDebateVoteEnum(value: string) {
    switch(value){
        case 'REALLY_AGAINST':
            return DebateVote.REALLY_AGAINST
        case 'AGAINST':
            return DebateVote.AGAINST
        case 'NEUTRAL':
            return DebateVote.NEUTRAL
        case 'FOR':
            return DebateVote.FOR
        case 'REALLY_FOR':
            return DebateVote.REALLY_FOR
        default:
            return DebateVote.NEUTRAL
    }
}