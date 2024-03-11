export class Topic {
    id: string = 'id';
    title: string = 'Titre du Sujet';
    description: string = 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ';
    parentTopicId: string = '';
    childrenId: string[] = [];
    medias: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}