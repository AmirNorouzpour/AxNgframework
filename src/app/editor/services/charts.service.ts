import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { ResourceSerivce } from "../../shared/services/api/resource.service";
import { ApiResult } from "shared/models";
import { Kline } from "../models/kline";

@Injectable({
  providedIn: "root",
})
export class ChartsService extends ResourceSerivce<Kline> {
  GetKLines(symbol, interval) {
    var resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      null,
      null,
      environment.getKLines
    );
    resourceEndpoint += "/" + symbol + "/" + interval;
    return this.apiHttpService.get<ApiResult<[]>>(resourceEndpoint);
  }

  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.chartsApi);
  }
}
