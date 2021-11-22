import { Token } from "./../models/token.model";
import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { Observable } from "rxjs";
import { ApiResult } from "shared/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  login(username: string, password: string): Observable<ApiResult<Token>> {
    return this.apiHttpService
      .post<ApiResult<Token>>(this.apiEndpointsService.getLoginEndpoint(), {
        username,
        password,
      })
      .pipe(
        tap((result: ApiResult<Token>) => {
          localStorage.setItem("access_token", result.data.access_token);
          localStorage.setItem("exp", result.data.expires_in.toString());
        })
      );
  }

  logout() {
    return this.apiHttpService
      .get(this.apiEndpointsService.getLogoutEndpoint())
      .pipe(
        tap((result: ApiResult<any>) => {
          if (result.isSuccess) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("exp");
          }
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    const exp = localStorage.getItem("exp");

    if (!(token && exp)) {
      return false;
    }

    const date = new Date(0);
    date.setUTCSeconds(Number.parseInt(exp));

    return date.valueOf() > new Date().valueOf();
  }

  getAuthorizationToken() {
    return localStorage.getItem("access_token");
  }
}
