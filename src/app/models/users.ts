export class User {
    id: string = '';
    firstName: string = '';
    name: string = '';
    email: string = '';
    address: string = '';
    profession: string = '';
    phone: string = '';
    language: string = '';
    politicSide: string = '';
    role: string = '';
    follows: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class PublicUser {
    id: string = '';
    firstName: string = '';
    name: string = '';
    politicSide: string = '';
}