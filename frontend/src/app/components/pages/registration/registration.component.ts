import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, ToastrModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registrationForm!: FormGroup;
  isSubmitted = false;
  returnUrl='';

  constructor(private formBuilder: FormBuilder, private userServices: UserService, private activatedRoute: ActivatedRoute, private router: Router){}

  /**
   * Initialises the form with the four obligatory fields and retrieve the returnUrl
   */
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required]
    });
    //Reads the return url from the query string parameters to return to the original page after the registration
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  /**
   * Getter to access the form fields.
   */
  get fc() {
    return this.registrationForm.controls;
  }

  /**
   * Validate the form, call registration and navigate to the return url.
   */
  submit(){
    this.isSubmitted = true;
    if(this.registrationForm.invalid) return;

    this.userServices.register({name: this.fc.name.value, email: this.fc.email.value, 
      password: this.fc.password.value, address: this.fc.address.value
    }).subscribe(() => {
      //After the registration, redirects the user to the url in returnUrl
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
