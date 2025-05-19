import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { UserLoginUrl } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const UserKey = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Initialise with user state from local storage
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //read-only version of userSubject
  public userObservable: Observable<User>;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.httpClient.post<User>(UserLoginUrl, userLogin).pipe(
      tap({
        //It is executed if the login is successful
        next: (user) => {
          //Saves the user
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          //Show a success notification
          this.toastrService.success(
            `Welcome to Football Jerse Shop ${user.name}`,
            'Login Successful'
          )
        },
        //It is executed if the login fails
        error: (errorResponse) => {
          //Show an error notification
          this.toastrService.error(errorResponse, 'Login Failed');
        }
      })
    );
  }

  logout() {
    //Local logout
    this.userSubject.next(new User());
    //Removes user data from local storage
    localStorage.removeItem(UserKey);
    //Page is reloaded
    window.location.reload();
  }

  /**
   * Converts the user object into a json string and saves it in local storage.
   * 
   * @param user  the object to convert
   */

  private setUserToLocalStorage(user: User){
    localStorage.setItem(UserKey, JSON.stringify(user));
  }

  /**
   * Retrives the user from local storage and executes the parsing.
   * 
   * @returns   the user object if it exists, otherwise create a new user
   */
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(UserKey);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
