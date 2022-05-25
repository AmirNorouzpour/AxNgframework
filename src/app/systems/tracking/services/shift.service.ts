import { Injectable } from "@angular/core";
import { ApiEndpointsService, ApiHttpService } from "src/app/shared/services";
import { Shift } from "../models/shift.model";
import { ResourceSerivce } from "./../../../shared/services/api/resource.service";
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
export class ShiftService extends ResourceSerivce<Shift>
  implements Resolve<Shift> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.shiftApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Shift> {
    const id = route.params["shiftId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
