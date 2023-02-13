import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequestModel } from '../models/userRequestModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  callUserAdd = new Subject<void>();

    communicationService(){
      this.callUserAdd.next()
    }

  //Get All Users
  getAllUsers(): Observable<UserRequestModel[]> {
    return this.httpClient.get<UserRequestModel[]>(environment.users)
  }

  //GetUserByID
  getUserById(id: number): Observable<UserRequestModel> {
    return this.httpClient.get<UserRequestModel>(`${environment.users}/${id}`)
  }

  //Get All Users
  createUser(user: UserRequestModel): Observable<UserRequestModel> {
    return this.httpClient.post<UserRequestModel>(environment.users, user)
  }

  //Update User
  editUser(user: UserRequestModel, id:number): Observable<UserRequestModel> {
    return this.httpClient.put<UserRequestModel>(`${environment.users}/${id}`, user)
  }


  //Delete User
  deleteUser(id: number): Observable<UserRequestModel> {
    return this.httpClient.delete<UserRequestModel>(`${environment.users}/${id}`)
  }
}
