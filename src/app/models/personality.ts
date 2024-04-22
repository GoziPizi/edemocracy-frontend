import { PublicUser } from "./users";

export class Personality {
  id: string = 'id-personality';
  userId: string = 'id-user';
  partyId?: string = 'id-party';
  for: string[] = ['id-for'];
  against: string[] = ['id-against'];
  description: string = 'description';
}

export class PersonalityWithUser extends Personality {
  user: PublicUser = new PublicUser();
}