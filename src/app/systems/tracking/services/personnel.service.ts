import { Injectable } from "@angular/core";
import { ApiEndpointsService, ApiHttpService } from "src/app/shared/services";
import { Personnel } from "../models/personnel.model";
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
export class PersonnelService extends ResourceSerivce<Personnel>
  implements Resolve<Personnel> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.personnelApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Personnel> {
    const id = route.params["personnelId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
