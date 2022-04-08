import { LoaderService } from "./../loader.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { ApiError, ResponseMetaData } from "../../models";
import { ApiErrorHandlerService } from "./api-error-handler.service";

@Injectable({
  providedIn: "root",
})
export class ApiHttpService {
  private readonly observe: string = "response";

  constructor(
    private http: HttpClient,
    private errorHandlerService: ApiErrorHandlerService,
    private loaderService: LoaderService
  ) {}

  //#region private
  private handleResponse<R>(response): R {
    const { body: result } = response;
    if ((!result || !result.isSuccess) && !(result instanceof Blob)) {
      throw new ApiError(result.message, result.statusCode);
    }
    result.metaData = this.getMetaDataFromResponseHeader(response);
    return result;
  }

  private getMetaDataFromResponseHeader(
    response: HttpResponse<any>
  ): ResponseMetaData | any {
    return {
      totalCount: response.headers.has("X-Pagination")
        ? response.headers.get("X-Pagination")
        : 0,
    };
  }
  //#endregion private

  public get<R>(url: string, options?: any): Observable<R> {
    this.loaderService.show();
    // debugger
    return <Observable<R>>(
      this.http
        .get<R>(url, Object.assign({}, options, { observe: this.observe }))
        .pipe(
          map((response) => this.handleResponse<R>(response)),
          catchError((error) =>
            throwError(this.errorHandlerService.handleError(error, options))
          ),
          finalize(() => this.loaderService.hide())
        )
    );
  }

  public post<R>(url: string, data: any, options?: any): Observable<R> {
    return <Observable<R>>(
      this.http
        .post<R>(
          url,
          data,
          Object.assign({}, options, { observe: this.observe })
        )
        .pipe(
          map((response) => this.handleResponse<R>(response)),
          catchError((error) =>
            throwError(this.errorHandlerService.handleError(error, options))
          )
        )
    );
  }

  public put<R>(url: string, data: any, options?: any): Observable<R> {
    return <Observable<R>>(
      this.http
        .put<R>(
          url,
          data,
          Object.assign({}, options, { observe: this.observe })
        )
        .pipe(
          map((response) => this.handleResponse<R>(response)),
          catchError((error) =>
            throwError(this.errorHandlerService.handleError(error, options))
          )
        )
    );
  }

  public delete<R>(url: string, options?: any) {
    return this.http
      .delete<R>(url, Object.assign({}, options, { observe: this.observe }))
      .pipe(
        catchError((error) =>
          throwError(this.errorHandlerService.handleError(error, options))
        )
      );
  }
}
