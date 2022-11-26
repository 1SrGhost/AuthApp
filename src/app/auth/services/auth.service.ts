import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IauthResponse, iUsuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: iUsuario;

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private http: HttpClient) {}
  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };

    return (
      this.http
        .post<IauthResponse>(url, body)
        /* Una forma de manejar los errores. */
        .pipe(
          tap((resp) => {
            if (resp.ok) {
              localStorage.setItem('token', resp.token!);


            }
          }),
          map((resp) => resp.ok),
          catchError((err) => of(err.error.msg)) //uso del of para convertir el valor boolean en un observable
        )
    );
  }
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return (
      this.http
        .post<IauthResponse>(url, body)
        /* Una forma de manejar los errores. */
        .pipe(
          tap((resp) => {
            if (resp.ok) {
              localStorage.setItem('token', resp.token!);


            }
          }),
          map((resp) => resp.ok),
          catchError((err) => of(err.error.msg)) //uso del of para convertir el valor boolean en un observable
        )
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<IauthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logOut() {
    localStorage.clear();
  }
}
