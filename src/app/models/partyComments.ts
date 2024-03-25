export class PartyComment {
    id: string = '';
    partyId: string = '';
    userId: string = '';
    content: string = '';
    createdAt: string = '';
    updatedAt: string = '';
}

export class PartyCommentWithName extends PartyComment {
    user = {
        firstName: '',
        name: ''
    }
}