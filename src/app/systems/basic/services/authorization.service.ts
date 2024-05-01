import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ApiEndpointsService, ApiHttpService } from "shared/services";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { Authorization } from "../models/authorization.model";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService extends ResourceSerivce<Authorization> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.authorizationApi, {
      getUrlFn: (parameters, queryParams) => {
        return apiEndpointsService.getAuthhorizationEndpoint(parameters);
      },
    });
  }

  savePermissions(parameters, data) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      parameters,
      null,
      "SavePermissions"
    );
    return this.apiHttpService.post<ApiResult<any>>(resourceEndpoint, data);
  }
}
