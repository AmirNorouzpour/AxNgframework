import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { Machine } from "./../models/machine.model";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { environment } from "environments/environment";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MachineService extends ResourceSerivce<Machine>
  implements Resolve<Machine> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.machineApi);
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Machine> {
    const id = route.params["machineId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
