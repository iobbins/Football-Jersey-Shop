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
}
