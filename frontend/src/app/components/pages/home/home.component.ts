import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jersey } from '../../../shared/models/jersey';
import { JerseyService } from '../../../services/jersey.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jerseyList: Jersey[] = [];

  constructor(private jerseyService:JerseyService, activatedRoute: ActivatedRoute){
    let jerseyObservable: Observable<Jersey[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        jerseyObservable = this.jerseyService.getAllJerseyBySearchTerm(params.searchTerm);
      else
        jerseyObservable = jerseyService.getAll();

        jerseyObservable.subscribe((serverJersey) => {
          this.jerseyList = serverJersey;
          //console.log(this.jerseyList)
        });

    });
    
  }
}
