import { PoliticSides } from "../enums/politicSides";

export class PersonalitySearchCriteria {
    politicSide: PoliticSides = PoliticSides.CENTER;
    for?: string[] = [];
    against?: string[] = [];
}

export class PartySearchCriteria {
    politicSide: PoliticSides = PoliticSides.CENTER;
    for?: string[] = [];
    against?: string[] = [];
}