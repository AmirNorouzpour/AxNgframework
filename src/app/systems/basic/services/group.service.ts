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
export class GroupService
  extends ResourceSerivce<Group>
  implements Resolve<Group>
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
  ): Observable<Group> {
    const id = route.params["groupId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }

  getUsersAndGroups(parameters) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      parameters,
      null,
      "GetGroupUsers"
    );
    return this.apiHttpService.get<ApiResult<UserAndGroup[]>>(resourceEndpoint);
  }

  addUserstoGroup(data) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      "AddUsers"
    );
    return this.apiHttpService.post<ApiResult<UserAndGroup>>(
      resourceEndpoint,
      data
    );
  }

  removeUserFromGroup(id) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      id,
      null,
      "RemoveUser"
    );
    return this.apiHttpService.delete<ApiResult<UserAndGroup>>(
      resourceEndpoint
    );
  }
}
