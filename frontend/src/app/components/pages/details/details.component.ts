import { Component } from '@angular/core';
import { Jersey } from '../../../shared/models/jersey';
import { ActivatedRoute } from '@angular/router';
import { JerseyService } from '../../../services/jersey.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  jersey: Jersey | undefined;

  constructor(activateRoute: ActivatedRoute, jerseyService:JerseyService) {
    activateRoute.params.subscribe((params) => {
      if(params.id)
          this.jersey = jerseyService.getJerseyById(params.id);
    })
  }


}
