import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AxMenuItem, ApiResult } from "shared/models";
import { Observable, of } from "rxjs";
import { ApiHttpService, ApiEndpointsService } from "shared/services";
import { map } from "rxjs/operators";
import { AppSetting } from "./app-setting.service";

@Injectable({
  providedIn: "root",
})
export class SystemMenuResolver implements Resolve<AxMenuItem[]> {
  constructor(
    private httpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private appSetting: AppSetting
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<AxMenuItem[]> {
    return this.httpService
      .get<ApiResult<AxMenuItem[]>>(
        this.apiEndpointsService.getSystemMenusEndpoint(
          this.appSetting.getSystemIdByName(route.data["systemName"])
        )
      )
      .pipe(map((result) => result.data));
  }
}
