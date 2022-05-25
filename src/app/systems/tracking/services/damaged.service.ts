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
import { Damaged } from "../models/damaged";

@Injectable({
  providedIn: "root",
})
export class DamagedService
  extends ResourceSerivce<Damaged>
  implements Resolve<Damaged>
{
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {

    super(apiHttpService, apiEndpointsService, environment.productInstanceApi, {
      getUrlFn: (parameters, queryParams) => {
        return apiEndpointsService.getDamagedEndpoint(parameters);
      },
    });
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Damaged> {
    const id = route.params["damagedId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }

  // export(parameters) {
  //   return this.apiHttpService.get<Blob>(
  //     this.apiEndpointsService.getPihXlsxEndpoint(parameters),
  //     { responseType: "blob" }
  //   );
  // }
}
