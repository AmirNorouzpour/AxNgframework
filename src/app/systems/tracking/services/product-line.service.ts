import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ProductLine } from "../models/productLine.model";
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
export class ProductLineService extends ResourceSerivce<ProductLine>
  implements Resolve<ProductLine> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.productLineApi);
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<ProductLine> {
    const id = route.params["productLineId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
