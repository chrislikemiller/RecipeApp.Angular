import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BackendService {
    private readonly API_URL = 'https://localhost:8081/api';
    private httpClient: HttpClient = inject(HttpClient);

    getAny(endpoint: string, params?: HttpParams): Observable<any> {
        return this.httpClient.get(`${this.API_URL}/${endpoint}`, { params });
    }

    get<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.httpClient.get<T>(`${this.API_URL}/${endpoint}`, { params });
    }

    post<T>(endpoint: string, body: any = undefined): Observable<T> {
        return this.httpClient.post<T>(`${this.API_URL}/${endpoint}`, body);
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.httpClient.put<T>(`${this.API_URL}/${endpoint}`, body);
    }

    delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.httpClient.delete<T>(`${this.API_URL}/${endpoint}`, { params });
    }
}