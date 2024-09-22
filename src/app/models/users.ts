import { PoliticSides } from "../enums/politicSides";

export enum MembershipStatus {
    NONE,
    STANDARD,
    PREMIUM
}

export class User {
    id: string = '';
    firstName: string = '';
    name: string = '';
    email: string = '';
    address: string = '';
    postalCode: string = '';
    city: string = '';
    description: string = '';
    profession: string = '';
    yearsOfExperience: number = 0;
    idNationality1?: string = '';
    idNationality2?: string = '';
    idNationality3?: string = '';
    birthSex: string = '';
    actualSex: string = '';
    sexualOrientation: string = '';
    religion: string = '';
    telephone: string = '';
    language: string = '';
    contributionStatus: MembershipStatus = MembershipStatus.NONE;
    profilePicture?: string = '';
    politicSide: PoliticSides = PoliticSides.CENTER;
    role: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    sponsorshipCode: string | null = null;
}

export class PublicUser {
    id: string = '';
    firstName: string = '';
    name: string = '';
    politicSide: PoliticSides = PoliticSides.CENTER;
    profilePicture?: string = '';
}