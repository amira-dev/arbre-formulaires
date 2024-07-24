import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'assets/forms.json'; // URL de l'API ou du fichier local

  constructor(private http: HttpClient) { }

  getForms(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}