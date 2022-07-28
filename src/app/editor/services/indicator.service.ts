import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { ResourceSerivce } from "../../shared/services/api/resource.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models";
import { Indicator, IndicatorGroup } from "../models/indicator";

@Injectable({
  providedIn: "root",
})
export class IndicatorService
  extends ResourceSerivce<Indicator>
  implements Resolve<Indicator>
{
  getMenuData() {
    debugger;
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      environment.getMenuData
    );
    return this.apiHttpService.get<ApiResult<IndicatorGroup[]>>(
      resourceEndpoint
    );
  }


  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.indicatorsApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Indicator> {
    const addressId = route.params["addressId"];
    const userId = route.parent.params["userId"];
    return this.getById([addressId, userId]).pipe(map((result) => result.data));
  }
}
