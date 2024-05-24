import { PoliticSides } from "../enums/politicSides";

export function politicSideMapperEnumToUser(politicSide: PoliticSides): string {
    switch(politicSide) {
        case PoliticSides.CENTER:
        return 'Centre';
        case PoliticSides.LEFT:
        return 'Gauche';
        case PoliticSides.RIGHT:
        return 'Droite';
        case PoliticSides.FAR_LEFT:
        return 'Extrême gauche';
        case PoliticSides.FAR_RIGHT:
        return 'Extrême droite';
        case PoliticSides.NONE:
        return 'Sans parti pris';
        default:
        return 'Centre';
    }
}