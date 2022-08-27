import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { ResourceSerivce } from "../../shared/services/api/resource.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models";
import { Editor } from "../models/indicator";

@Injectable({
  providedIn: "root",
})
export class EditorService
  extends ResourceSerivce<Editor>
  implements Resolve<Editor>
{
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.editorsApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Editor> {
    const strategyId = route.parent.params["strategyId"];
    return this.getById([strategyId]).pipe(map((result) => result.data));
  }

  save(data) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      "Save"
    );
    return this.apiHttpService.post<ApiResult<any>>(resourceEndpoint, data);
  }

  getByunique(id, version) {
    var resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      "GetByUnique"
    );
    resourceEndpoint += "/" + id + "/" + version;
    return this.apiHttpService.get<ApiResult<any>>(resourceEndpoint, null);
  }
  GetUserStrategies() {
    var resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      "GetUserStrategies"
    );
    return this.apiHttpService.get<ApiResult<any>>(resourceEndpoint, null);
  }

}
