import { Component } from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isSubmitted: boolean = false;
  productForm!: FormGroup;
  returnUrl='';
  user!: User;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser
    }) 
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      team: ['', Validators.required],
      year: ['', Validators.required],
      type: ['', Validators.required],
      size: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  submit() {
    this.isSubmitted = true;
    if(this.productForm.invalid) return;

    this.userService.addProduct({
      team: this.fc.team.value, year: this.fc.year.value, type: this.fc.type.value, size: this.fc.size.value, image: this.fc.image.value, price: this.fc.price.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      })
      
  }

  get fc() {
    return this.productForm.controls;
  }

}
