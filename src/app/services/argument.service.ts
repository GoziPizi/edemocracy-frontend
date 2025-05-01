import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Argument, ArgumentType } from '../models/argument';



@Injectable({
  providedIn: 'root'
})
export class ArgumentService {
  constructor() {}

  getArgumentsByDebate(debateId: string): Observable<Argument[]> {
    // 💡 Remplace ceci plus tard par un appel HTTP
    const mockArguments: Argument[] = [
        {
          id: '1',
          title: 'Pour A',
          content: 'Contenu A',
          type: ArgumentType.FOR,
          isFlaged: false,
          anonymous: false,
          debateId: '123',
          nbGood: 10,
          nbBad: 2,
          nbTotal: 4,
          hasVote: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Contre B',
          content: 'Contenu B',
          type: ArgumentType.AGAINST,
          isFlaged: false,
          anonymous: false,
          debateId: '123',
          nbGood: 5,
          nbBad: 1,
          nbTotal: 4,
          hasVote: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      

    return of(mockArguments);
  }
}
