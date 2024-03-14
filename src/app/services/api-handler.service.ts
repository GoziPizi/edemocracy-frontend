import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonalitySearchCriteria } from '../models/criterias';
import { TopicSearchItem } from '../models/topics';
import { Debate } from '../models/debate';
import { Argument } from '../models/argument';

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

  //Topics related methods

  getTopics() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/api/topics/`, {
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

  getDebateArguments(id: string) {
    const token = localStorage.getItem('token');
    return this.http.get<Argument[]>(`${this.baseUrl}/api/debates/${id}/arguments`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}
