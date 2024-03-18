import { DebateVote } from "../enums/voteDebate";

export function debateVoteEnumToString(value: DebateVote) {
    switch(value){
        case DebateVote.REALLY_AGAINST:
            return 'très contre'
        case DebateVote.AGAINST:
            return 'contre'
        case DebateVote.NEUTRAL:
            return 'neutre'
        case DebateVote.FOR:
            return 'pour'
        case DebateVote.REALLY_FOR:
            return 'très pour'

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