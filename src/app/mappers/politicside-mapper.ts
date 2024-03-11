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