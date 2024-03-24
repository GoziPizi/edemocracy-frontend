import { PoliticSides } from "../enums/politicSides";

export function politicSideMapper(politicSide: string): PoliticSides {
    switch(politicSide) {
        case 'Centre':
        return PoliticSides.CENTER;
        case 'center':
        return PoliticSides.CENTER;
        case 'Gauche':
        return PoliticSides.LEFT;
        case 'Droite':
        return PoliticSides.RIGHT;
        case 'Extrême gauche':
        return PoliticSides.FAR_LEFT;
        case 'Extrême droite':
        return PoliticSides.FAR_RIGHT;
        default:
        return PoliticSides.CENTER;
    }
}

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
        default:
        return 'Centre';
    }
}