import { Injectable } from '@angular/core';
import { Jersey } from '../shared/models/jersey';
import { jerseyList } from '../../data';
@Injectable({
  providedIn: 'root'
})
export class JerseyService {

  constructor() { }

  getAll(): Jersey[]{
    return jerseyList;
  }

  getAllJerseyBySearchTerm(searchTerm: string){
    return this.getAll().filter(jersey => jersey.team.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getJerseyById(jerseyId:number):Jersey | undefined {
    return this.getAll().find(s => s.id == jerseyId);
  }
}
