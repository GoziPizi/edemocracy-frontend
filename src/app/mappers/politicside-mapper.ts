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
        return PoliticSides.FARLEFT;
        case 'Extrême droite':
        return PoliticSides.FARRIGHT;
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
        case PoliticSides.FARLEFT:
        return 'Extrême gauche';
        case PoliticSides.FARRIGHT:
        return 'Extrême droite';
        default:
        return 'Centre';
    }
}