import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //Rapresent the form with the fields email and password
  loginForm!: FormGroup;
  isSubmitted = false;
  //Destination url after the login
  returnUrl='';

  constructor(private formBuilder: FormBuilder, private userServices: UserService, private activatedRoute: ActivatedRoute, private router: Router) {}

  /**
   * Initialises the form with the two obligatory fields and retrieve the returnUrl
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    //Reads the return url from the query string parameters to return to the original page after the login
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  /**
   * Getter to access the form fields.
   */
  get fc() {
    return this.loginForm.controls;
  }

  /**
   * Validate the form, call login and navigate to the return url.
   */
  submit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userServices.login({email: this.fc.email.value, password: this.fc.password.value})
      .subscribe(() => {
        //After tyhe login, redirects the user to the url in returnUrl
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
