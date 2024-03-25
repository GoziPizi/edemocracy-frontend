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
import { debateVoteEnumToStrictString } from '../mappers/vote-mapper';
import { OpinionWithTopicName } from '../models/opinions';
import { environment } from '../../environments/environment';
import { SearchResult } from '../models/searchResult';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {

  private baseUrl: string;

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api_url;
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

  parseJwt(token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const payload = this.parseJwt(token);
    return payload.id;
  }

  register(form: any) {
    return this.http.post(`${this.baseUrl}/api/login/register`, form);
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

  updateUser(form: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.baseUrl}/api/users`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getUserPartis() {
    const token = localStorage.getItem('token');
    return this.http.get<Party[]>(`${this.baseUrl}/api/users/partis`, {
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

  getOpinions() {
    const token = localStorage.getItem('token');
    return this.http.get<OpinionWithTopicName[]>(`${this.baseUrl}/api/users/opinions`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postOpinion(topicId: string, opinion: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/users/opinions`, { topicId, opinion }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  deleteOpinion(opinionId: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/users/opinions/${opinionId}`, {
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

  getTopicslist(): Observable<TopicSearchItem[]> {
    const token = localStorage.getItem('token');
    return this.http.get<TopicSearchItem[]>(`${this.baseUrl}/api/topics/fulllist`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getTopicsParentlist(): Observable<TopicSearchItem[]> {
    const token = localStorage.getItem('token');
    return this.http.get<TopicSearchItem[]>(`${this.baseUrl}/api/topics/parentlist`, {
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

  getDebatesByTopicId(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/${id}/debates`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postTopic(form: any, image?: File) {
    let formData = new FormData();
    for(let key in form) {
      formData.append(key, form[key]);
    }
    if (image) {
      formData.append('image', image);
    }
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/topics`, formData, {
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

  answerInvitation(id: string, answer: boolean) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/invitations/${id}/answer`, { answer }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getAllHistoricEvents(partyId: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/parties/${partyId}/history`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postHistoricEvent(partyId: string, form: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/parties/${partyId}/history`, form, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  deleteHistoricEvent(partyId: string, eventId: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/parties/${partyId}/history/${eventId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getPartyComments(partyId: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/parties/${partyId}/comments`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  postPartyComment(partyId: string, content: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/parties/${partyId}/comments`, { content }, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  deletePartyComment(partyId: string, commentId: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/parties/${partyId}/comments/${commentId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Admin related methods

  getBanWords() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/admin/banwords`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  addBanWord(banWord: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/admin/banwords`, {word: banWord}, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  removeBanWord(id: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/admin/banwords/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getAdmins() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/admin/admins`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  setAdmin(email: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/admin/admins`, {email}, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  removeAdmin(id: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/api/admin/admins/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getVerificationRequests() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/admin/verifications-request`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  verifyRequest(id: string, verified: boolean) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/api/admin/verifications-request/${id}`, {verified}, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  //Search related methods

  textSearch(query: string) {
    const token = localStorage.getItem('token');
    return this.http.get<SearchResult[]>(`${this.baseUrl}/api/search/all/${query}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}
