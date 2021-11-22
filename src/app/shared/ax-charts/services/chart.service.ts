import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "shared/services";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  getChart<ChartModel>(chartId, filter?, cid?): Observable<ChartModel> {
    return this.apiHttpService
      .get<ApiResult<ChartModel>>(
        this.apiEndpointsService.getChart(chartId, filter, cid)
      )
      .pipe(map((result) => result.data));
  }
}
