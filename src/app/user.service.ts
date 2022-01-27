import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:8080/user';

  constructor(private http:HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getBinList(): Observable<any> {
    return this.http.get(this.baseUrl+"/deleted");
  }

  createUser(user: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/add', user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`, { responseType: 'text' });
  }

  deleteUserPermanent(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDB/${userId}`, { responseType: 'text' });
  }

  restoreUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/restore/${userId}`, { responseType: 'text' });
  }

  getUser(userId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${userId}`);
  }

  updateUser(userId: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${userId}`, value);
  }
  
}                                           