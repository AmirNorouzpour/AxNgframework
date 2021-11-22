import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { User } from "../models";
import { ResourceSerivce } from "./../../../shared/services/api/resource.service";
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
export class UserService
  extends ResourceSerivce<User>
  implements Resolve<User> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.userApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<User> {
    const id = route.params["userId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }

  getUsersAndGroups(parameters, queryParams) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
        this.resourceName,
        parameters,
        queryParams,
        "GetUsersAndGroups"
    );
    return this.apiHttpService.get<ApiResult<UserAndGroup[]>>(resourceEndpoint);
  }
}
