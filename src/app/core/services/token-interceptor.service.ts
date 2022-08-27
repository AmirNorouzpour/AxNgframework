import { AuthService } from "./../../auth";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const authToken = this.authService.getAuthorizationToken();
      if (req.url.toLocaleLowerCase().indexOf("localhost") == -1) {
        return next.handle(req);
      }
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
