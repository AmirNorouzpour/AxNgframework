import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiEndpointsService, ApiHttpService } from "shared/services";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { Authorization } from "../models/authorization.model";

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
}
