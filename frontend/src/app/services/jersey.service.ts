import { Injectable } from '@angular/core';
import { Jersey } from '../shared/models/jersey';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JerseyByIdUrl, JerseyBySearchUrl, JerseyUrl } from '../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class JerseyService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Jersey[]>{
    return this.http.get<Jersey[]>(JerseyUrl);
  }

  getAllJerseyBySearchTerm(searchTerm: string){
    return this.http.get<Jersey[]>(JerseyBySearchUrl + searchTerm);
  }

  getJerseyById(jerseyId:string):Observable<Jersey> {
    return this.http.get<Jersey>(JerseyByIdUrl + jerseyId);
  }
}
