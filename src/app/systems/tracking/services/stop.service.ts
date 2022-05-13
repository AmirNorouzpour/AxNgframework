import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { environment } from "environments/environment";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Stop } from "../models/Stop";

@Injectable({
  providedIn: "root",
})
export class StopService
  extends ResourceSerivce<Stop>
  implements Resolve<Stop>
{
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.productInstanceApi, {
      getUrlFn: (parameters, queryParams) => {
        return apiEndpointsService.getStopEndpoint(parameters);
      },
    });
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Stop> {
    const id = route.params["stopId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
