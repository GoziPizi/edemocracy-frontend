import { PoliticSides } from "../enums/politicSides";

export class Party {
    id: string = 'id';
    founderId: string = 'id';
    name: string = 'Nom du parti';
    description: string = 'Description du parti';
    reason: string = 'Raison du parti';
    logo: string = '';
    politicSide: PoliticSides = PoliticSides.CENTER;
    for: string[] = [];
    against: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}