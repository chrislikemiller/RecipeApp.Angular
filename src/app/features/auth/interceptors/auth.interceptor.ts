import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "../../../services/authService";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    publicApiRoutes = ['recipes/all'];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getAuthenticatedUser();
        const isPublicRoute = this.publicApiRoutes.some(publicPath => req.url.includes(publicPath));
        console.log(`Intercepting request. Public: ${isPublicRoute}`, req);
        if (!isPublicRoute && user) {
            console.log("Authenticating with token", user.token);
            const requestWithCredentials = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token.token}`
                }
            });
            return next
                .handle(requestWithCredentials)
                .pipe(
                    tap({
                        next: (event) => {
                            console.log("AuthInterceptor:", event);
                        },
                        error: (error: HttpErrorResponse) => {
                            console.error("AuthInterceptor: Error occurred", error);
                            if (error.status === 401 || error.status === 403 || error.status === 405) {
                                this.authService.logout();
                            }
                        }
                    })
                );
        }
        return next.handle(req);
    }

}
