import { PoliticSides } from "../enums/politicSides";

export class PersonalitySearchCriteria {
    politicSide: PoliticSides = PoliticSides.CENTER;
    for?: string[] = [];
    against?: string[] = [];
}