import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jersey } from '../../../shared/models/jersey';
import { JerseyService } from '../../../services/jersey.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jerseyList: Jersey[] = [];

  constructor(private jerseyService: JerseyService){
    this.jerseyList = jerseyService.getAll();
  }
}
