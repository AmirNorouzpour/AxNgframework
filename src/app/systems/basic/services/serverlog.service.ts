import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ServerLog } from "../models";
import { ResourceSerivce } from "./../../../shared/services/api/resource.service";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ServerlogService extends ResourceSerivce<ServerLog> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.auditApi, {
      getUrlFn: (parameters, queryParams) => {
        return apiEndpointsService.getAuditLogsEndpoint(
          parameters,
          queryParams
        );
      },
      deleteUrlFn: (parameters) => {
        return apiEndpointsService.getAuditLogEndpoint(parameters);
      },
    });
  }
}
