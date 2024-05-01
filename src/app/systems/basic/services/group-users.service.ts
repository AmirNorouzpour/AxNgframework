import { ResourceUrlFn } from "./../../../shared/models/api/resource-url-fn";
import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { Group } from "../models";
import { ResourceSerivce } from "../../../shared/services/api/resource.service";
import { environment } from "environments/environment";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserAndGroup } from "../models/ug.model";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class GroupUsersService
  extends ResourceSerivce<UserAndGroup>
  implements Resolve<UserAndGroup>
{
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.groupApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<UserAndGroup> {
    const id = route.params["groupId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
