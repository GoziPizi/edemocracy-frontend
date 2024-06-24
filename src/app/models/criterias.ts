import { PoliticSides } from "../enums/politicSides";

export class PersonalitySearchCriteria {
    politicSide?: PoliticSides;
    for?: string[] = [];
    against?: string[] = [];
}

export class PartySearchCriteria {
    politicSide?: PoliticSides;
    for?: string[] = [];
    against?: string[] = [];
}