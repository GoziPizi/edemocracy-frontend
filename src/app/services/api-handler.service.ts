import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PartySearchCriteria, PersonalitySearchCriteria } from '../models/criterias';
import { TopicSearchItem } from '../models/topics';
import { Debate } from '../models/debate';
import { Argument } from '../models/argument';
import { DebateVote } from '../enums/voteDebate';
import { PoliticSides } from '../enums/politicSides';
import { Party } from '../models/party';
import { User } from '../models/users';
import { Personality } from '../models/personality';
import { debateVoteEnumToStrictString, debateVoteEnumToString } from '../mappers/vote-mapper';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {

  private baseUrl: string;

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:8080';
    this.checkLogin();
  }

  login(email: string, password: string) {
    this.http.post(`${this.baseUrl}/api/login`, { email, password }).subscribe((response: any) => {
      if (response.key) {
        localStorage.setItem('token', response.key);
        this.isLogged.next(true);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLogged.next(false);
    }
    this.http.post(`${this.baseUrl}/api/login/check`, { token }).subscribe((response: any) => {
      if (response) {
        this.isLogged.next(true);
      } else {
        this.isLogged.next(false);
      }
    });
  }

  register(form: any) {
    let data = form.value;
    data.telephone = '078948'
    data.address = 'Rue de la paix'
    data.profession = 'Developpeur'
    data.politicSide = PoliticSides.CENTER
    data.language = 'fr'
    //remove passwordConfirmation
    delete data.passwordConfirmation;
    this.http.post(`${this.baseUrl}/api/login/register`, data).subscribe((response: any) => {
      if (response.key) {
        localStorage.setItem('token', response.key);
        this.isLogged.next(true);
      }
    });
  }

  //Users related methods

  getUser() { 
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/api/users`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getUserParty() {
    const token = localStorage.getItem('token');
    return this.http.get<Party>(`${this.baseUrl}/api/users/party`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getUserPersonality() {
    const token = localStorage.getItem('token');
    return this.http.get<Personality>(`${this.baseUrl}/api/users/personality`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Topics related methods

  getTopics() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getTopicslist() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/fulllist`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getTopicsParentlist() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/parentlist`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getTopicById(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getParentsTopicSearchItems(): Observable<TopicSearchItem[]> {
    const token = localStorage.getItem('token');
    return this.http.get<TopicSearchItem[]>(`${this.baseUrl}/api/topics/parentlist`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getDebatesByTopicId(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/${id}/debates`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postTopic(form: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/topics`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Personalities related methods

  getPersonality(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/personality/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  searchPersonalities(criteria: PersonalitySearchCriteria) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/personality/search`, criteria, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Debate related methods

  getDebate(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<Debate>(`${this.baseUrl}/api/debates/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  voteForDebate(id: string, value: DebateVote){
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/debates/${id}/vote`, {value: debateVoteEnumToStrictString(value)}, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getDebateArguments(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<Argument[]>(`${this.baseUrl}/api/debates/${id}/arguments`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postDebate(form: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/debates`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Argument related methods

  postArgument(content: string, debateId: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/arguments`, { content, debateId }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getArgument(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/arguments/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  deleteVote(id: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/arguments/${id}/vote`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  voteUp(id: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/arguments/${id}/vote`, { value: true }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  voteDown(id: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/arguments/${id}/vote`, { value: false }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Party related methods

  createParty(form: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/parties`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getParty(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<Party>(`${this.baseUrl}/api/parties/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  updateParty(id:string, form: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.baseUrl}/api/parties/${id}`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  checkAdminPartyRights(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<boolean>(`${this.baseUrl}/api/parties/${id}/check-admin`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  searchParties(criteria: PartySearchCriteria) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/parties/search`, criteria, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getPartyMembers(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<User[]>(`${this.baseUrl}/api/parties/${id}/members`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  addMemberToParty(partyId: string, email: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/parties/${partyId}/members`, { email }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getInvitations() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/invitations`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getInvitation(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/invitations/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}
