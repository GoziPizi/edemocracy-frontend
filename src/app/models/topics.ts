export class Topic {
    id: string = 'id';
    title: string = 'Titre du Sujet';
    description: string = 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ';
    parentTopicId: string = '';
    childrenId: string[] = [];
    medias: string[] = [];
    debates: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class TopicSearchItem {
    id: string = 'id';
    title: string = 'Titre du Sujet';
}