export class Opinion {
    id: string = '';
    topicId: string = '';
    userId: string = '';
    opinion: string = '';
}

export class OpinionWithTopicName extends Opinion {
    topicTitle: string = '';
}