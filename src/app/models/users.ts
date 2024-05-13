import { PoliticSides } from "../enums/politicSides";

export class User {
    id: string = '';
    firstName: string = '';
    name: string = '';
    email: string = '';
    address: string = '';
    description: string = '';
    profession: string = '';
    telephone: string = '';
    language: string = '';
    profilePicture?: string = '';
    politicSide: PoliticSides = PoliticSides.CENTER;
    role: string = '';
    follows: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class PublicUser {
    id: string = '';
    firstName: string = '';
    name: string = '';
    politicSide: PoliticSides = PoliticSides.CENTER;
    profilePicture?: string = '';
}