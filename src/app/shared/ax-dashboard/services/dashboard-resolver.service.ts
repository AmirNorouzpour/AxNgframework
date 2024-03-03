import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { DashboardChart } from "./../models/dashboard-chart.model";
import { Observable } from "rxjs";
import { ApiHttpService, ApiEndpointsService } from "shared/services";
import { AppSetting } from "./../../../panel/services/app-setting.service";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class DashboardResolver implements Resolve<any> {
  constructor(
    private httpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private appSetting: AppSetting
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<DashboardChart[]> {
    return this.httpService
      .get<ApiResult<DashboardChart[]>>(
        this.apiEndpointsService.getDashboardChartsEndpoint(
          this.appSetting.getSystemIdByName(route.data["systemName"])
        )
      )
      .pipe(map((result) => result.data));
  }
}
