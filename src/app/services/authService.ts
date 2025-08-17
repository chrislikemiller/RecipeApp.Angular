import { inject, Inject, Injectable } from "@angular/core";
import { delay, Observable, of, tap, throwError, map, catchError, BehaviorSubject } from "rxjs";
import { BackendService } from "./backendService";
import { LocalConfigService } from "./localStorageService";
import { ConfigService } from "./interfaces/configService";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

export type RegisteringUserData = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}
export type RegisterResponse = {
    success: true;
    email: string;
} | {
    success: false;
    error: Error;
}

export type User = {
    id: string;
    name: string;
    token: Token;
}

export type Token = {
    expiresAt: number;
    token: string;
}

export type LoginResponse = {
    success: true;
    id: string;
    name: string;
    token: Token;
} | {
    success: false;
    error: Error;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly AUTHENTICATED_USER = "auth_user";

    private currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
    currentUser$ = this.currentUserSubject.asObservable();

    private backendService = inject(BackendService);
    private configService = inject(LocalConfigService);
    private router = inject(Router);

    constructor() {
        this.checkUserAuthenticated();
    }

    getAuthenticatedUser(): User | undefined {
        return this.currentUserSubject.value;
    }

    setAuthenticatedUser(user: User): void {
        this.configService.set(this.AUTHENTICATED_USER, user);
        this.currentUserSubject.next(user);
    }

    checkUserAuthenticated(): void {
        const user = this.configService.get<User>(this.AUTHENTICATED_USER);
        if (!user) {
            this.currentUserSubject.next(undefined);
        } else {
            this.currentUserSubject.next(user);
        }
    }

    register(userData: RegisteringUserData): Observable<RegisterResponse> {
        const { email, name, password, confirmPassword } = userData;
        if (!email || !name || !password || !confirmPassword) {
            return of({ success: false, error: new Error('All fields are required') });
        }

        return this.backendService
            .post<RegisterResponse>('auth/register', { email, name, password, confirmPassword })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error("Registration failed:", error.error);
                    throw error;
                }),
                map((response) => {
                    if (response.success) {
                        console.error("Registration successful ", response.email);
                    }
                    else {
                        console.error("Registration failed ", email, response.error);
                    }
                    return response;
                })
            );
    }

    login(email: string, password: string): Observable<LoginResponse> {
        if (!email || !password) {
            return of({ success: false, error: new Error('All fields are required') });
        }

        return this.backendService
            .post<LoginResponse>('auth/login', { email, password }).pipe(
                map((response) => {
                    if (response.success) {
                        const user = { id: response.id, name: response.name, token: response.token };
                        this.setAuthenticatedUser(user);
                        console.log("Login successful for user:", user);
                    } else {
                        console.error("Login failed for email:", email, "Error:", response.error);
                    }
                    console.log("Login API call response:", response);
                    return response;
                }),
            );
    }

    logout() {
        console.log("Logging out user");
        this.backendService.post<LoginResponse>('auth/logout');
        this.currentUserSubject.next(undefined);
        this.router.navigate(['/login']);
    }
}
